function createTinyTune(context, onStep) {
  "use strict";
  var MOODS = {
    garden: { type: "triangle", scale: [0, 2, 4, 7, 9, 12, 14, 16], root: 261.63, harmony: 4, attack: 0.012, release: 0.22 },
    sunset: { type: "sine", scale: [0, 3, 5, 7, 10, 12, 15, 17], root: 220.0, harmony: 2, attack: 0.02, release: 0.32 },
    moon: { type: "sine", scale: [0, 2, 5, 7, 9, 12, 14, 17], root: 196.0, harmony: 0, attack: 0.03, release: 0.4 }
  };
  var DEFAULT_NOTES = [0, 2, 4, -1, 3, 5, 4, -1];
  var LOOKAHEAD_MS = 25, SCHEDULE_AHEAD = 0.12;

  var master = context.createGain();
  master.gain.value = 0.15;
  master.connect(context.destination);

  var generation = 0, timer = null, uiTimers = [], voices = [];
  var playing = false, disposed = false;
  var state = null, nextTime = 0, stepIndex = 0;

  function num(v, lo, hi, def) {
    v = Number(v);
    if (!isFinite(v)) return def;
    return Math.min(hi, Math.max(lo, v));
  }

  function cleanNotes(arr) {
    var out = [];
    for (var i = 0; i < 8; i++) {
      var n = Array.isArray(arr) ? Number(arr[i]) : DEFAULT_NOTES[i];
      if (!Array.isArray(arr)) n = DEFAULT_NOTES[i];
      out.push(Number.isInteger(n) && n >= 0 && n <= 7 ? n : -1);
    }
    return out;
  }

  function setMaster(v) {
    var t = context.currentTime;
    master.gain.cancelScheduledValues(t);
    master.gain.setValueAtTime(master.gain.value, t);
    master.gain.linearRampToValueAtTime(v, t + 0.03);
  }

  function voice(freq, time, dur, level, mood) {
    var osc = context.createOscillator();
    var g = context.createGain();
    osc.type = mood.type;
    osc.frequency.setValueAtTime(freq, time);
    g.gain.setValueAtTime(0.0001, time);
    g.gain.linearRampToValueAtTime(level, time + mood.attack);
    g.gain.setTargetAtTime(0.0001, time + Math.max(mood.attack, dur - mood.release), mood.release / 4);
    osc.connect(g);
    g.connect(master);
    var end = time + dur + 0.05;
    osc.start(time);
    osc.stop(end);
    var rec = { osc: osc, gain: g };
    voices.push(rec);
    osc.onended = function () {
      try { g.disconnect(); } catch (e) {}
      var i = voices.indexOf(rec);
      if (i >= 0) voices.splice(i, 1);
    };
  }

  function scheduleStep(i, time, gen) {
    var mood = state.mood, n = state.notes[i];
    var dur = state.stepDur * 0.9;
    if (n >= 0) {
      var semi = mood.scale[n];
      voice(mood.root * Math.pow(2, semi / 12), time, dur, 0.5, mood);
      if (mood.harmony && i % 2 === 0) {
        var h = mood.scale[Math.max(0, n - mood.harmony)] - 12;
        voice(mood.root * Math.pow(2, h / 12), time, dur, 0.22, mood);
      }
    }
    if (typeof onStep === "function") {
      var delay = Math.max(0, (time - context.currentTime) * 1000);
      var id = setTimeout(function () {
        var k = uiTimers.indexOf(id);
        if (k >= 0) uiTimers.splice(k, 1);
        if (gen === generation && playing) {
          try { onStep(i); } catch (e) {}
        }
      }, delay);
      uiTimers.push(id);
    }
  }

  function tick(gen) {
    if (gen !== generation || !playing) return;
    while (nextTime < context.currentTime + SCHEDULE_AHEAD) {
      scheduleStep(stepIndex, nextTime, gen);
      nextTime += state.stepDur;
      stepIndex = (stepIndex + 1) % 8;
    }
    timer = setTimeout(function () { tick(gen); }, LOOKAHEAD_MS);
  }

  function halt(notify) {
    generation++;
    playing = false;
    if (timer !== null) { clearTimeout(timer); timer = null; }
    uiTimers.forEach(clearTimeout);
    uiTimers = [];
    var t = context.currentTime;
    voices.slice().forEach(function (v) {
      try {
        v.gain.gain.cancelScheduledValues(t);
        v.gain.gain.setValueAtTime(v.gain.gain.value, t);
        v.gain.gain.linearRampToValueAtTime(0.0001, t + 0.03);
        v.osc.stop(t + 0.05);
      } catch (e) {}
    });
    if (notify && typeof onStep === "function") {
      try { onStep(-1); } catch (e) {}
    }
  }

  return {
    play: function (options) {
      if (disposed) return;
      var o = options && typeof options === "object" ? options : {};
      halt(false);
      var tempo = num(o.tempo, 50, 140, 90);
      var moodName = Object.prototype.hasOwnProperty.call(MOODS, o.mood) ? o.mood : "garden";
      state = { mood: MOODS[moodName], notes: cleanNotes(o.notes), stepDur: 60 / tempo / 2 };
      if (o.volume !== undefined) setMaster(num(o.volume, 0, 0.35, 0.15));
      playing = true;
      stepIndex = 0;
      nextTime = context.currentTime + 0.06;
      tick(generation);
    },
    stop: function () { halt(true); },
    setVolume: function (v) {
      if (!disposed) setMaster(num(v, 0, 0.35, 0.15));
    },
    dispose: function () {
      if (disposed) return;
      halt(true);
      disposed = true;
      setTimeout(function () {
        try { master.disconnect(); } catch (e) {}
      }, 80);
    }
  };
}