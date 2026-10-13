# Misfire relearn: required after this job

**Do it every time.** Ford requires the Misfire Monitor Neutral Profile Correction after engine timing repairs, crank sensor or trigger wheel work, or any time the engine or transmission is removed (Ford SSM 45788, quoted in FORScan's forum write-up below). Ford's Crankshaft Pulley installation procedure calls for it as its last step.

The PCM stores a learned profile of the crankshaft trigger wheel. After timing work, the old profile no longer matches. Until it's relearned, the truck can set false misfire codes (P0300–P0306) with a solid or flashing check-engine light, and the misfire monitor can't watch for real misfires. A battery disconnect does **not** clear the old profile on these trucks; a KAM reset does.

## What you need

- **FORScan** with a FORScan-compatible adapter. Either works:
  - **FORScan for Windows** with an **OBDLink EX** (USB). This is what the truck this guide came from used.
  - **FORScan Lite** (iPhone or Android) with an **OBDLink MX+** (Bluetooth).
- FORScan for Windows runs on Intel/AMD Windows PCs, not Apple Silicon Macs.
- The procedure has been in FORScan since version 2.3.42 (August 2021).

## Before teardown (5 minutes)

1. Connect FORScan and let it identify the modules.
2. Open the **Service Procedures** tab (the wrench icon). Confirm **PCM — Misfire Monitor Neutral Profile Correction** is listed. Don't run it.
3. If it isn't listed, contact FORScan support with your VIN before you start the job.

## After the job

1. Fix any leaks and confirm the engine runs normally. Clear any codes left from the repair.
2. **Reset the old profile:** FORScan → Service Procedures → **PCM — Reset All Adaptations** (the KAM reset). This also clears fuel trims and shift adaptations; the truck relearns those as you drive.
3. Warm the engine fully (radiator fan cycling). Park, A/C and accessories off, fuel above 1/4.
4. FORScan → Service Procedures → **PCM — Misfire Monitor Neutral Profile Correction** → press Play.
5. Read and accept both warning screens. Confirm the engine coolant temperature shown is correct, then close that window.
6. Raise the RPM to the value FORScan shows, then let it return to idle. Repeat as the screen asks until it reports complete.
7. Check the PID **MP_LRN** reads **YES** and there are no codes (especially P0315, "unable to learn profile").

If it stalls at the "rev at idle" step or gets interrupted, recheck that the engine is fully warm and nothing else is drawing attention (warning lights, limp mode), then run it again.

## Field result

On the 2013 4WD this guide came from: FORScan for Windows with an OBDLink EX, adaptations reset, relearn run. The truck runs strong.

## Sources

- FORScan forum, "Forscan misfire monitor neutral profile correction" (step-by-step guides for FORScan PC and Lite attached; quotes Ford SSM 45788): https://forum.forscan.org/viewtopic.php?f=5&t=24578
- Ford TSB listing the IDS path Powertrain → Service Functions → Misfire Monitor Neutral Profile Correction: https://static.nhtsa.gov/odi/tsbs/2016/MC-10205004-9999.pdf
- Snap-on, Ford Misfire Monitor Neutral Profile Correction: https://www.snapon.com/Diagnostics/US/KB/Ford-Misfire-Monitor-Neutral-Profile-Correction.htm
