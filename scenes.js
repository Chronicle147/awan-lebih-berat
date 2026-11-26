// Awan Lebih Berat dari Pesawat Jet - 9:16 vertical short (dark theme, pop captions from VO)
const film = SM.film();
const BIG = 440;        // main figure size
const SMALL = 200;      // prop size
const CLOUD_SZ = 350;   // cloud prop size
const PLANE_SZ = 280;   // plane prop size

// ===== INTRO =====
film.scene("intro", sc => {
  const t = sc.intro("countdown", sc.clip.intro);
  // Cloud pops in during countdown
  const cloud = sc.prop("cloud", { x: sc.W * 0.5, y: sc.H + 100, size: CLOUD_SZ * 1.2, color: "a3", hidden: true });
  cloud.pop(t - 1.5);
  cloud.bob(t - 1.0, t + 0.5);
  // Weight label
  sc.text("500.000 KG", { x: sc.cx, y: sc.H * 0.75, size: 80, color: "a1" }).in(t - 0.5, "slam");
  sc.exit("slide-up", { d: 0.4 });
});

// ===== HOOK: AWAN VS JET =====
film.scene("hook", sc => {
  sc.ground({ style: "none" });
  sc.env.sky({ y: 0, h: sc.H, color: "a3" });

  // Cloud on left
  const cloud = sc.prop("cloud", { x: sc.W * 0.3, y: sc.H * 0.3, size: CLOUD_SZ, color: "ink", hidden: true });
  cloud.pop(0.3).bob(0.5, 3.0);

  // Jet on right
  const jet = sc.prop("plane", { x: sc.W * 0.8, y: sc.H * 0.3, size: PLANE_SZ, rotation: -90, color: "a1", hidden: true });
  jet.pop(0.5).moveTo(sc.W * 0.7, sc.H * 0.3, sc.cue("jet") - 0.2, 0.5);

  // Weight labels
  sc.text("500.000 KG", { x: sc.W * 0.3, y: sc.H * 0.55, size: 72, color: "a2" }).in(sc.cue("biasa") + 0.2, "slam");
  sc.text("180.000 KG", { x: sc.W * 0.7, y: sc.H * 0.55, size: 72, color: "a1" }).in(sc.cue("jet") + 0.2, "slam");

  // VS text in middle
  sc.text("VS", { x: sc.cx, y: sc.H * 0.55, size: 100, color: "a3" }).in(1.5, "pop");

  // Stickman reaction
  const me = sc.figure({ x: sc.W * 0.5, y: sc.groundY + 100, size: BIG, face: "dots", hidden: true });
  me.pop(sc.cue("nggak") + 0.2);
  me.emote("surprise", sc.cue("nggak") + 0.4);
  me.point(sc.W * 0.3, sc.H * 0.3, sc.cue("lebih") + 0.3);

  sc.exit("slide-up", { d: 0.4 });
});

// ===== FACT 1: ANGKA BERAT =====
film.scene("fact1", sc => {
  sc.enter("slide-up", { d: 0.4 });
  sc.ground({ style: "none" });
  sc.env.sky({ y: 0, h: sc.H, color: "a3" });

  // Cloud with weight counter
  const cloud = sc.prop("cloud", { x: sc.W * 0.3, y: sc.H * 0.25, size: CLOUD_SZ, color: "ink", hidden: true });
  cloud.pop(0.3);

  // Weight number animation
  const weightCloud = sc.text("500.000 KG", { x: sc.W * 0.3, y: sc.H * 0.55, size: 80, color: "a2", hidden: true });
  weightCloud.pop(sc.cue("ratus") - 0.1, "slam");

  // Jet with weight
  const jet = sc.prop("plane", { x: sc.W * 0.75, y: sc.H * 0.3, size: PLANE_SZ, rotation: -90, color: "a1", hidden: true });
  jet.pop(sc.cue("boeing") - 0.2);

  const weightJet = sc.text("180.000 KG", { x: sc.W * 0.75, y: sc.H * 0.55, size: 80, color: "a1", hidden: true });
  weightJet.pop(sc.cue("kosong") - 0.1, "slam");

  // Arrow showing cloud heavier
  const arrow = sc.prop("arrowup", { x: sc.cx, y: sc.H * 0.4, size: 150, color: "a2", hidden: true });
  arrow.pop(sc.cue("ribu") + 0.3).pulse(sc.cue("ribu") + 0.5, 1.0);

  sc.text("LEBIH BERAT!", { x: sc.cx, y: sc.H * 0.3, size: 84, color: "a2" }).in(sc.cue("ribu") + 0.5, "slam");

  sc.exit("slide-up", { d: 0.4 });
});

// ===== FACT 2: BUTIRAN AIR =====
film.scene("fact2", sc => {
  sc.ground({ style: "none" });
  sc.env.sky({ y: 0, h: sc.H, color: "a3" });

  // Zoom into cloud - show droplets
  const cloud = sc.prop("cloud", { x: sc.W * 0.5, y: sc.H * 0.25, size: CLOUD_SZ * 1.5, color: "ink", hidden: true });
  cloud.pop(0.2).scaleTo(1.8, 0.5, 1.0, "back.out(2)");

  // Water droplets (using drop prop)
  const droplets = [];
  for (let i = 0; i < 12; i++) {
    const angle = (i / 12) * Math.PI * 2;
    const r = 180 + Math.random() * 60;
    const dx = Math.cos(angle) * r;
    const dy = Math.sin(angle) * r * 0.6;
    const drop = sc.prop("drop", {
      x: sc.W * 0.5 + dx,
      y: sc.H * 0.3 + dy,
      size: 60 + Math.random() * 40,
      color: "a3",
      hidden: true
    });
    droplets.push(drop);
    drop.pop(0.8 + i * 0.05).bob(1.0 + i * 0.05, 2.0);
  }

  // Microscope label
  sc.text("MIKROSKOPIK", { x: sc.cx, y: sc.H * 0.6, size: 72, color: "a3" }).in(sc.cue("mikro") - 0.1, "slam");
  sc.text("JUTAAN BUTIRAN", { x: sc.cx, y: sc.H * 0.7, size: 68, color: "a2" }).in(sc.cue("jutaan") - 0.1, "pop");

  // Total weight
  sc.text("TOTAL = GILA BANGET", { x: sc.cx, y: sc.H * 0.85, size: 64, color: "a1" }).in(sc.cue("total") - 0.1, "words");

  sc.exit("slide-up", { d: 0.4 });
});

// ===== FACT 3: KENAPA NGAMBANG =====
film.scene("fact3", sc => {
  sc.ground({ style: "none" });
  sc.env.sky({ y: 0, h: sc.H, color: "a3" });

  // Cloud floating
  const cloud = sc.prop("cloud", { x: sc.W * 0.5, y: sc.H * 0.25, size: CLOUD_SZ, color: "ink", hidden: true });
  cloud.pop(0.2).bob(0.5, 4.0);

  // Hot air rising from below (using fire/sparkle props as heat)
  const heat1 = sc.prop("fire", { x: sc.W * 0.3, y: sc.H * 0.8, size: 100, color: "a1", hidden: true });
  const heat2 = sc.prop("fire", { x: sc.W * 0.5, y: sc.H * 0.8, size: 120, color: "a1", hidden: true });
  const heat3 = sc.prop("fire", { x: sc.W * 0.7, y: sc.H * 0.8, size: 100, color: "a1", hidden: true });

  heat1.pop(sc.cue("panas") - 0.2).scaleTo(0.5, sc.cue("panas"), 0.8, "back.out(2)");
  heat2.pop(sc.cue("panas")).scaleTo(0.6, sc.cue("panas") + 0.1, 0.8, "back.out(2)");
  heat3.pop(sc.cue("panas") + 0.2).scaleTo(0.5, sc.cue("panas") + 0.3, 0.8, "back.out(2)");

  // Up arrows
  const up1 = sc.prop("arrowup", { x: sc.W * 0.3, y: sc.H * 0.65, size: 120, color: "a1", hidden: true });
  const up2 = sc.prop("arrowup", { x: sc.W * 0.5, y: sc.H * 0.65, size: 140, color: "a2", hidden: true });
  const up3 = sc.prop("arrowup", { x: sc.W * 0.7, y: sc.H * 0.65, size: 120, color: "a1", hidden: true });

  up1.pop(sc.cue("dorong") - 0.2).moveTo(sc.W * 0.3, sc.H * 0.4, sc.cue("dorong"), 1.0);
  up2.pop(sc.cue("dorong")).moveTo(sc.W * 0.5, sc.H * 0.4, sc.cue("dorong") + 0.1, 1.0);
  up3.pop(sc.cue("dorong") + 0.2).moveTo(sc.W * 0.7, sc.H * 0.4, sc.cue("dorong") + 0.2, 1.0);

  // Bubble comparison
  const bubble = sc.prop("bubble", { x: sc.W * 0.5, y: sc.H * 0.85, size: 150, color: "a3", hidden: true });
  bubble.pop(sc.cue("gelembung") - 0.1).pulse(sc.cue("gelembung"), 1.0);
  sc.text("KAYAK GELEMBUNG", { x: sc.cx, y: sc.H * 0.92, size: 64, color: "a3" }).in(sc.cue("gelembung"), "slam");

  sc.exit("slide-up", { d: 0.4 });
});

// ===== FACT 4: AWAN BADAI =====
film.scene("fact4", sc => {
  sc.ground({ style: "none" });
  sc.env.sky({ y: 0, h: sc.H, color: "a1" }); // dark stormy sky

  // Cumulonimbus - bigger, darker cloud
  const stormCloud = sc.prop("raincloud", { x: sc.W * 0.5, y: sc.H * 0.2, size: CLOUD_SZ * 2, color: "ink", hidden: true });
  stormCloud.pop(0.2).scaleTo(1.2, 0.5, 0.8, "back.out(2)");

  // Lightning
  const lightning = sc.prop("lightning", { x: sc.W * 0.5, y: sc.H * 0.45, size: 300, color: "a3", hidden: true });
  lightning.pop(sc.cue("badai") - 0.1).glow(sc.cue("badai"), 0.5);

  // Weight label
  sc.text("1.000.000 TON", { x: sc.cx, y: sc.H * 0.55, size: 96, color: "a1" }).in(sc.cue("juta") - 0.1, "slam");

  // Elephant comparison
  const elephants = [];
  for (let i = 0; i < 5; i++) {
    const el = sc.prop("animal", { x: sc.W * 0.2 + i * 80, y: sc.H * 0.75, size: 120, color: "muted", hidden: true });
    elephants.push(el);
    el.pop(sc.cue("gajah") + i * 0.1).bob(sc.cue("gajah") + i * 0.1, 1.0);
  }
  sc.text("= 100.000 GAJAH", { x: sc.cx, y: sc.H * 0.9, size: 68, color: "a2" }).in(sc.cue("gajah") + 0.5, "pop");

  // Rain falling
  sc.fx.rain(sc.cue("petir"), sc.cue("petir") + 2.0, { color: "a3", intensity: 0.8 });
  sc.text("PETIR = AIR JATUH", { x: sc.cx, y: sc.H * 0.96, size: 56, color: "a3" }).in(sc.cue("petir") + 0.2, "words");

  sc.exit("flash", { d: 0.2 });
});

// ===== FACT 5: PESAWAT LEWAT =====
film.scene("fact5", sc => {
  sc.ground({ style: "none" });
  sc.env.sky({ y: 0, h: sc.H, color: "a3" });

  // Cloud stays
  const cloud = sc.prop("cloud", { x: sc.W * 0.5, y: sc.H * 0.3, size: CLOUD_SZ, color: "ink", hidden: true });
  cloud.pop(0.2).bob(0.5, 4.0);

  // Plane flies through
  const jet = sc.prop("plane", { x: -200, y: sc.H * 0.3, size: PLANE_SZ, rotation: -90, color: "a1", hidden: true });
  jet.pop(0.5);
  const tFly = jet.moveTo(sc.W + 200, sc.H * 0.3, 1.0, 3.0);

  // Contrail
  const trail = sc.prop("cloud", { x: sc.W * 0.5, y: sc.H * 0.3, size: 80, color: "muted", hidden: true });
  trail.pop(1.5).scaleTo(0.1, 1.5, 1.0, "back.in(2)").fadeOut(2.5);

  // Cloud unbothered
  sc.text("AWAN TETAP SANTAI", { x: sc.cx, y: sc.H * 0.6, size: 72, color: "a2" }).in(sc.cue("tetap") - 0.1, "slam");

  // Stickman watching
  const me = sc.figure({ x: sc.W * 0.5, y: sc.groundY + 50, size: BIG, face: "dots", hidden: true });
  me.pop(0.8);
  me.lookAt(sc.W * 0.5, sc.H * 0.3, 1.0);
  me.emote("surprise", 1.2);

  sc.exit("slide-up", { d: 0.4 });
});

// ===== REACTION: MIND BLOWN =====
film.scene("reaction", sc => {
  sc.ground({ style: "none" });
  sc.env.sky({ y: 0, h: sc.H, color: "a3" });

  // Stickman mind blown
  const me = sc.figure({ x: sc.W * 0.5, y: sc.groundY + 50, size: BIG, face: "dots", hidden: true });
  me.pop(0.2);
  me.emote("surprise", 0.3);
  me.pose("mindBlown", sc.cue("ingat") - 0.3, 1.5);

  // Brain explosion effect
  const brain = sc.prop("brain", { x: sc.W * 0.5, y: sc.groundY - 350, size: 180, color: "a3", hidden: true });
  brain.pop(sc.cue("ingat") - 0.2).scaleTo(2.0, sc.cue("ingat"), 0.5, "back.out(3)").spin(sc.cue("ingat") + 0.3, 2.0);

  // Cloud in background winking
  const cloud = sc.prop("cloud", { x: sc.W * 0.8, y: sc.H * 0.2, size: CLOUD_SZ * 0.8, color: "ink", hidden: true });
  cloud.pop(0.5).bob(0.8, 3.0);

  // Text
  sc.text("BEAST MODE", { x: sc.cx, y: sc.H * 0.25, size: 100, color: "a1" }).in(sc.cue("lebih") - 0.1, "slam");
  sc.text("AWAN > JET", { x: sc.cx, y: sc.H * 0.75, size: 84, color: "a2" }).in(sc.cue("jet") - 0.1, "pop");

  sc.exit("flash", { d: 0.2 });
});

// ===== OUTRO =====
film.scene("outro", sc => {
  sc.enter("fade", { color: "bg" });
  const t = sc.outro("cta", sc.clip.outro);
  const me = sc.figure({ x: sc.W * 0.5, y: sc.groundY - 50, size: BIG * 0.8, face: "dots", hidden: true });
  me.pop(t + 0.5);
  me.celebrate(t + 1.0, { hold: true });

  // Cloud buddy
  const cloud = sc.prop("cloud", { x: sc.W * 0.75, y: sc.H * 0.3, size: CLOUD_SZ * 0.6, color: "ink", hidden: true });
  cloud.pop(t + 0.8).bob(t + 1.0, 2.0);
});