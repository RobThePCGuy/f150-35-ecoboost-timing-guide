# Stage 15: Fill, reconnect, first start and misfire relearn

Oil and coolant go in, the battery and fuel pump module get reconnected, you prove the fuel system holds pressure without leaking, and then you start the engine, bleed the cooling system and run the misfire relearn the PCM needs after a crank and timing job. Keep the Ford procedures open alongside this page for the diagrams and exact wording.

**Have open:** Ford workshop manual: Section 303-01A: Engine Front Cover (Installation, oil fill step); Engine Cooling System Draining, Filling and Bleeding (degas bottle, without a vacuum filler); Fuel System Pressure Release; Battery Disconnect and Connect; Section 303-01A: Crankshaft Pulley (Installation, final step). The owner's manual oil-check pages.

**Tools / parts / time limits:**
- 5W-30 meeting Ford WSS-M2C946-A, about 6.0 US qt with a new Motorcraft FL-500S filter (count the oil you used priming the pump)
- Coolant: Motorcraft Orange, or Motorcraft Yellow (VC-13-G concentrate / VC-13DL-G prediluted) where Ford's compatibility guidance allows it with a known, clean factory Orange fill. Never Gold or an unknown aftermarket coolant.
- Coolant refractometer, funnel, 8 mm socket
- FORScan Lite on a phone with an OBDLink MX+ adapter
- **No oil in the engine until 90 minutes after the front cover went on.** Check the time in your log.
- **No running the engine** until oil, coolant and the fuel leak check are done.

## Steps

1. **Confirm the clock.** Front cover installed + 90 minutes has passed. All fixtures, cam tools and temporary plugs are out. Timing and torque logs are complete.
2. **Oil.** Fit the new filter, check the drain plug, and pour in about 6.0 US qt of 5W-30. That number is a target, not a finish line: the dipstick decides.
3. **Read the dipstick right.** Level ground, engine off, park brake on, in Park. Wait 15 minutes for oil to settle. Pull the dipstick, wipe it, push it all the way in, pull it and read. Keep it between MIN and MAX; never over MAX. Seat the dipstick and cap fully.
4. **Coolant fill.** Fill through the degas bottle until the level sits between the COOLANT FILL LEVEL marks. Check the mix with the refractometer and record it, along with how much went in.
5. **Heater settings.** Set heat to max temperature, blower to max, air to the dash vents.
6. **Cap on.** Reinstall the degas cap tightly with the engine cold. Never open it once the engine is warm.
7. **Battery.** Reconnect the negative cable and torque the clamp nut to **5 Nm (44 lb-in)**. `From bag B02-03`
8. **FPCM.** The fuel pump control module sits on the frame rail above the spare tire. Push its plug on until it clicks and tug; if it has a colored slide lock, push it home (Ford figure N0121097 in "Fuel System Pressure Release").
9. **Pressurize and look for leaks.** Turn the key to run (don't crank), wait 3 seconds, off, and repeat a few times; it can take more than one cycle to build pressure. With a light, check the high-pressure flare nut, the pump inlet coupling and every fuel joint you touched. Any wet spot: stop.
10. **Pre-start checklist.** Oil and coolant levels good, timing verified, critical fasteners torqued and logged, fixtures out, every connector, hose, ground and belt on, no rags or caps, 90-minute oil wait met, fuel leak check passed. Mark it in your log.
11. **First start.** Start it and let it idle. Watch the oil pressure light go out within a few seconds and listen. Look again at the fuel fittings with it running.
12. **Bleed the cooling system.** At idle, feel for hot air at the vents. Let it reach operating temperature: hot air at the vents, temp gauge steady mid-NORMAL, upper radiator hose hot. If the air stays cool and the gauge doesn't move, the coolant is low. Shut down, let it cool, top up.
13. **Cool and top up.** Shut off, let the engine cool fully, check the degas bottle and top up to the marks. Repeat the warm-up, cool-down and top-up cycle until the level stays put.
14. **Recheck the oil** with the engine-off method from step 3.
15. **Misfire relearn (required).** After crank and timing work the PCM's crank-wheel profile has to be relearned, or it flags misfires that aren't there. A battery disconnect does not reset it on this truck. Full walk-through: [RELEARN.md](../RELEARN.md). Short version:
    - Engine fully warm, fuel above 1/4 tank, in Park, A/C and lights off. Clear any leftover codes.
    - In FORScan Lite (with the OBDLink MX+): Service procedures > PCM **Misfire Monitor Neutral Profile Correction**. Follow the screen: rev to the speed it shows (around 3,000 rpm), let it fall back to idle, repeat until the counter reaches 0 and it reports complete.
    - Check PID **MP_LRN** reads YES and there are no codes, especially P0315.
    - **Fallback** if the procedure isn't offered or keeps aborting: do a KAM reset (PCM Reset All Adaptations), confirm MP_LRN now reads NO, then on the road with the engine warm, coast from **60 down to 40 mph with your foot off both pedals, three times**. MP_LRN should flip to YES with no P0315. If MP_LRN still read YES right after the reset, the reset didn't take; a shop with Ford IDS has to run it.
    - Screenshot the result and save the post-repair scan for your log.

## Done when
- Oil level between MIN and MAX on a settled engine-off reading; filter and plug dry
- Coolant at the marks after repeated warm/cool cycles, mix recorded
- Fuel leak check passed, before and during running
- Engine idles smoothly, oil light off, heater blowing hot
- MP_LRN = YES, no P0315 or other codes, result saved

## Stop if
- The oil pressure light stays on past a few seconds: shut it off now
- You see or smell fuel at any fitting
- Heavy knocking, rattling or grinding, overheating, or a hard misfire
- It won't start after a few tries: stop cranking and find out why instead of grinding the starter

**Next:** [Stage 16](16-road-test-and-close-out.md)
