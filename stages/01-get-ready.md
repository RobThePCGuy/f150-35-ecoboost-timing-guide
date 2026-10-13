# Stage 1: Get ready

Confirm your truck matches this guide, get every part and tool on the bench, set up a system for the 100-plus fasteners that come out, and record how the engine behaves while it still runs. Nothing comes apart in this stage. Have the matching Ford workshop manual procedure open for every stage that follows; it has the diagrams and exact wording this guide points to.

**Have open:** Ford workshop manual, Section 303-01A (Engine, 3.5L EcoBoost): Timing Drive Components, Engine Front Cover, Oil Pump; Section 303-03: Cooling System Draining, Filling and Bleeding.

**Tools / parts / time limits:**
- Cam holding plates 303-1248 (Ford special tool or an equivalent kit). You need them in Stage 5; don't start without them.
- 18 mm socket and breaker bar (crank bolt), 15 mm socket and long bar (belt tensioner), 17 mm crowfoot (fuel flare nut), flare-nut wrenches, 8/10/13/15 mm sockets including deep 10 mm.
- Inch-pound and foot-pound torque wrenches, angle gauge, strap wrench, 3-jaw puller and pulley installer, crank seal remover/installer, stretch-belt remover/installer for the A/C belt.
- Trim-pin tools, hose-clamp pliers, flush cutters, plastic caps and plugs, drain pans, waterproof plastic, metal surface prep and lint-free rags.
- Floor jack, jack stands, and a strap for the front axle (4WD only, Stage 6).
- Scan tool plus an OBD adapter that FORScan supports (OBDLink EX with FORScan for Windows, or OBDLink MX+ with FORScan Lite on a phone).
- Parts: see [PARTS.md](../PARTS.md).

## Steps
1. **Confirm the engine by VIN.** Run your VIN through any free decoder or Ford's owner site. The 8th character should be **T** for the 3.5L EcoBoost on a 2011–2014 F-150. If it's anything else, this guide is the wrong one.
2. **Note your drivetrain.** Part-time 4WD trucks have a front axle that blocks the oil pan; Stage 6 has you support and lower it. 2WD trucks skip the axle support in Stage 6 and go straight to the pan.
3. **Check the cooling system type.** Look for a translucent pressurized tank with a pressure cap (the degas bottle) instead of a cap on the radiator. These trucks have one, so the refill in Stage 15 uses the degas-bottle fill and bleed. No vacuum filler needed.
4. **Check the parts.** Open the timing kit and oil pump boxes and match every piece to the packing list. Confirm the kit includes two new secondary tensioners; this guide replaces them. Read the oil pump maker's instruction sheet in the box now, not during install. Lay everything from [PARTS.md](../PARTS.md) on the bench, including the new single-use bolts (crank bolt, fuel pump bolts, fuel tube bracket nut).
   Plan on far more than book time. Home mechanics in the comments report anywhere from two long days to 60 hours, mostly lost to small things: harness clips, stuck valve covers, the A/C belt and stuck phaser bolts (common report in the video comments).
5. **Set up the bolt system.** Every fastener that comes out goes in a labeled bag named for its stage and order (B03-07 = Stage 3, seventh bag). Each step in this guide gives the bag tag, count, socket, return stage and torque. Use two tables: one for bags in removal order, one for parts. The full ledger is [BOLTS.md](../BOLTS.md). Print it or keep it on a tablet by the truck.
6. **Learn the turning rules before you need them.**
   - Belt tensioner: 15 mm socket on the pulley hex, turn counterclockwise to release.
   - Crank with the pulley on: 18 mm socket on the crank bolt, **clockwise only**.
   - Crank with the pulley off (Stage 5 on): thread the old crank bolt back in over a short spacer, snug it by hand, turn clockwise with the 18 mm. Throw that old bolt away when the job is done.
   - Fuel flare nut: set the 17 mm crowfoot at 90° to the wrench handle so the torque wrench reads true with no correction math.
7. **Scan the truck while it runs.** Plug in the scanner. Save every code and freeze frame, and write down the mileage. Note the oil level and record the cold-start rattle (a phone video works) so you have something to compare to afterward.
8. **Do the FORScan relearn pre-check (about 5 minutes).** Key on, connect FORScan. Under Service Procedures, find PCM "Misfire Monitor Neutral Profile Correction". Don't run it; screenshot that it's there. In live data, find **MP_LRN** and confirm it reads YES; screenshot that too. You'll need this procedure after the job. Details and the backup method if it isn't listed: [RELEARN.md](../RELEARN.md).

## Done when
- VIN confirms the 3.5L EcoBoost; you know whether you have 4WD or 2WD.
- Every box checked complete against its packing list; oil pump sheet read.
- Tools on the bench, including 303-1248 plates and the axle strap (4WD).
- Bags labeled and tables set up.
- Codes, freeze frames, mileage and relearn screenshots saved.

## Stop if
- A part is missing, wrong, or damaged.
- The oil pump sheet calls for a mounting or seal difference you don't have parts for.
- You don't have cam holding plates.

**Next:** [Stage 2: Relieve fuel pressure](02-relieve-fuel-pressure.md)
