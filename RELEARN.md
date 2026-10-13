# Misfire relearn after the timing job

Ford's Crankshaft Pulley procedure (installation, last step) requires a scan-tool "Misfire Monitor Neutral Profile Correction" after this job. Skip it and the PCM keeps the old crank-wheel profile, which can set false misfire codes.

## The decision

**Use FORScan Lite on a phone with a FORScan-compatible Bluetooth adapter (the OBDLink MX+ works), and run PCM "Misfire Monitor Neutral Profile Correction" in the driveway.** FORScan for Windows also has it, but only runs on Intel/AMD PCs, not Apple Silicon Macs.

**Fallback, if the function is missing or keeps getting interrupted:** use FORScan Lite to run PCM "Reset All Adaptations" (the KAM reset), then let the truck relearn on the road with three closed-throttle coasts from 60 mph down to 40 mph, with no brake. Ford built this road method into the PCM as a backup.

## Why the step can't be skipped

- Ford's own 2012 model-year OBD manual (the closest one to a 2013 that I found) says the PCM learns a correction for small errors in the spacing of the crank trigger-wheel teeth. "Since inaccuracies in the wheel tooth spacing can produce a false indication of misfire, the misfire monitor is not active until the corrections are learned."
- The same manual says that on these PCMs the learned profile is **stored in non-volatile memory**. That changes how the relearn works:
  - Disconnecting the battery does **not** erase the old profile. Ford SSM 45788, as quoted on the FORScan forum, says: "The MP_LRN data is no longer cleared with a battery disconnect... In order to properly reset the Misfire Profile, a KAM clear must be performed."
  - The road-learning routine runs only when no profile is stored ("once per profile learning sequence"). So normal driving does **not** fix it over time. The truck keeps using the old profile until a tool resets it.
- The risk if you skip it is false misfire codes, not a dead monitor. Ford lists P0300 to P0306 (cylinder misfire) and P0316 (misfire in the first 1,000 revolutions) in this monitor. A real case: a 2015 Mustang EcoBoost had its crank pulley replaced and the dealer skipped this relearn. Afterward it set multiple-cylinder misfire codes "right at 2,965 RPM" whenever it dropped below 3,000 rpm. A Flex 3.5 EcoBoost owner reported misfires on many cylinders until the dealer ran the calibration. Ford SSM 45788 describes the same thing: a solid or flashing check-engine light with P030X codes when the profile isn't relearned after engine work.
- If the profile gets cleared and the truck then fails to learn it in three 60-to-40 coasts, it sets **P0315** ("unable to learn profile"). Until a profile is learned, the misfire monitor stays off, so real misfires go undetected.

## Answers to the three questions

### 1. FORScan

- **The procedure exists, and that's its exact name.** FORScan release 2.3.42 (August 21, 2021) added the PCM service function "Misfire Monitor Neutral Profile Correction" for "multiple Ford models with gasoline engine 2010+ model year (if your car has no such function and you believe it must be available, please contact support)". Later releases added more models and a separate "Clearing Misfire Monitor Profile Correction Data" function.
- **The mobile app has it.** A FORScan forum moderator (Ecmbuster, August 2023) posted the steps under "Service Procedures > PCM Misfire Monitor Neutral Profile Correction". He attached two guides: one for FORScan on a PC and one titled "Ford Misfire Monitor Neutral Profile Correction-Android.pdf" for FORScan Lite. FORScan's comparison page says Lite on iOS and Android has service functions "except most dangerous". This one isn't in that group.
- **Windows FORScan has it too**, but FORScan for Windows runs only on x86 (Intel/AMD) PCs, not ARM machines such as Apple Silicon Macs. If you have an x86 Windows laptop, that works as well.
- **Not proven for your truck:** I found no post confirming this function runs on a 2011 to 2014 F-150 PCM specifically. FORScan's own notes admit that some PCMs it covers don't actually support the function (for example, a 2015 Focus PCM, removed in a later release). One Fusion owner got "service procedure interrupted" every time he tried. That's why there's a check to do before teardown (below).
- An old 2018 FORScan thread and an f150forum post say "FORScan can't do it". Both are out of date. They were written before version 2.3.42.

### 2. Other apps and tools

- **OBDLink app:** no. OBDLink's own page says the MX+ does bi-directional work only "when paired with the right third-party app", and it names FORScan as one of them. The OBDLink app reads codes and live data. It doesn't run Ford service procedures.
- **Carista:** I found no listing of this function for a 2013 F-150. Its published Ford features are oil reset, battery and similar resets. Don't buy it for this job.
- **BlueDriver:** it uses its own dongle, not the MX+, and I found no Ford misfire-profile function for it. Skip it.
- **Autel, Launch, Foxwell, Innova:** Snap-on documents this function on its professional tools. I found no source confirming it for a 2013 F-150 on any of the cheap tools. You don't need one, because FORScan Lite on hardware you already own covers it.

### 3. Learning it without a tool

Ford's road method is real. It's in Ford's OBD manual, and Ford left it active "as a backup":
- Engine fully warm and fuel above 15%.
- Get above 60 mph. Then lift fully off the gas and **don't touch the brake**. Let the truck coast down to 40 mph in gear. The PCM learns while the fuel is cut during the coast.
- Ford's conditions: speed 30 to 75 mph, engine 1300 to 3700 rpm, brake off. It usually learns on the first coast and gets up to three tries. If it can't learn, it sets P0315.
- **The catch:** this only happens after the old profile has been cleared. With no tool, the old profile stays in memory, because a battery disconnect doesn't clear it on this generation. So the road method alone, without first clearing the profile, does nothing.

## Steps for you

**Before teardown (5 minutes, proves the tool can do it):**
1. Put FORScan Lite on an iPhone or Android phone. Either works with the MX+.
2. Plug in the MX+, key on, connect, and let it find the modules.
3. Open Service procedures and look for PCM "Misfire Monitor Neutral Profile Correction". Screenshot the list and the PCM ID. Don't start it.
4. In live data, look for the PID **MP_LRN**. It should read YES now. Screenshot it.
5. If the function isn't listed, ask FORScan support with the VIN and the screenshots, as their release note says to. Then plan on the fallback.

**After the job is done:**
1. Start the truck and let it reach full operating temperature: radiator fan cycling, coolant well above 176°F. Fuel above 1/4 tank.
2. Park, A/C and defrost off, lights and accessories off, no one in the way. Clear any codes the repair left behind.
3. FORScan Lite > Service > PCM "Misfire Monitor Neutral Profile Correction" > start. Accept the warnings and check that it shows a sensible engine temperature.
4. Do what the screen asks. On Fords that means raising the revs to the number shown on screen and then letting go back to idle, over and over, until its countdown reaches 0 and it says complete. Ford's version learns while the engine coasts down from those revs with fuel cut.
5. Check that **MP_LRN = YES**, read codes (there should be none, especially no P0315), and screenshot the result for the work log.
6. Drive normally for a day and recheck codes.

**Fallback (if step 3 is missing or keeps getting interrupted):**
1. FORScan Lite > Service > PCM "Reset All Adaptations" (KAM reset). This also erases fuel trims and shift adaptations. The truck may idle or shift a little oddly for a few drives. That's normal.
2. Check MP_LRN. It should now read **NO**. If it still reads YES, the reset didn't clear the profile, and the next step won't do anything. Stop and go to a shop with Ford IDS.
3. Warm truck, highway: three coasts from 60 down to 40 mph, throttle fully closed, no brake, in gear.
4. MP_LRN should now read **YES**, with no P0315. If P0315 sets, the truck failed to learn. That points to a crank sensor or trigger-wheel problem from the job, not to the procedure.

## Confidence

- **High** on the facts about how the system works. They come from Ford's own OBD manual and SSM 45788: the profile is stored in non-volatile memory, a battery disconnect doesn't clear it, driving won't relearn it on its own, and skipping it risks false P030X codes.
- **High** that FORScan, including Lite, has this exact procedure.
- **Medium-high** that it runs on this specific 2013 PCM. FORScan covers "2010+ gasoline", but I found no 2011 to 2014 F-150 report either way. The 5-minute check before teardown settles it.

## Sources

- Ford OBD System Operation Summary, 2012 MY, revision July 13, 2011, pp. 19-22 (Profile Correction; Neutral Profile Correction and Non-Volatile Memory; entry-condition tables): https://www.newtonnet.co.uk/fiesta/fordobd2012.pdf
- Ford OBD Operations Summary, Gasoline 2020-2023, p. 6 (the same tables, "Profile correction factors learned in NVRAM: Yes"): https://www.fordservicecontent.com/Ford_Content/catalog/motorcraft/OBD-Operations-Summary-Gasoline-2020-2023.pdf
- FORScan forum, moderator post quoting Ford SSM 45788, with the FORScan PC and Lite (Android) procedure guides: https://forum.forscan.org/viewtopic.php?f=5&t=24578
- FORScan change history (2.3.42 added the function for 2010+ gasoline models; later notes on unsupported PCMs and on "Clearing Misfire Monitor Profile Correction Data"): https://forscan.org/changes_history.html
- FORScan edition comparison (Lite iOS/Android service functions "except most dangerous"): https://forscan.org/comparsion.html
- FORScan home page (Windows x86 only, no ARM): https://forscan.org/home.html
- FORScan forum, Fusion "service procedure interrupted" (not every PCM supports it): https://forum.forscan.org/viewtopic.php?t=22454
- FORScan forum, 2015 Mustang EcoBoost false misfire codes after a crank pulley swap without the relearn, and Flex 3.5 EcoBoost case: https://forum.forscan.org/viewtopic.php?t=7845
- Snap-on knowledge base, Ford Misfire Monitor Neutral Profile Correction (Park/Neutral, warm, A/C off, rev above about 3,500 then back to idle until the countdown reaches 0): https://www.snapon.com/Diagnostics/US/KB/Ford-Misfire-Monitor-Neutral-Profile-Correction.htm
- MOTOR magazine, "Diagnosing Ford Misfires" (three 60-to-40 no-brake coasts; MP_LRN PID): https://www.motor.com/magazine-summary/diagnosing-ford-misfires/
- OBDLink MX+ page (bi-directional work only through third-party apps such as FORScan): https://www.obdlink.com/lp/mxp-1a/

## Field result

On the 2013 4WD this guide was written from, the PCM adaptations were reset (Reset All Adaptations in FORScan) after the job, and the truck ran strong afterward.
