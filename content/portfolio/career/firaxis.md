---
title: Firaxis Games
position: Graphics Programmer
start_date: 2020-10-01
end_date: 2025-09-05
location: Sparks-Glencoe, MD
link: https://firaxis.com/
description: Leading developer of strategy games including the Civilization and XCOM series.
tags:
  - C++
  - Typescript
  - Vulkan
  - DirectX 12
  - Unreal Engine
achievements:
  - Created core procedural systems for in-game environments, including vegetation placement, building distribution, and river construction.
  - Worked in close collaboration with multidisciplinary teams of artists and programmers, ensuring alignment and integration of product features across the product’s lifecycle.
  - Implemented efficient CPU ray tracing algorithms for both single and batched intersection queries.
  - Managed asset performance via extensive and automated performance testing.
---

## Projects

Firaxis is the most lively studio I've had the chance to be part of. Every day of the week there were multiple events and activities to participate in. That community brought that same energy into the workplace, making it a joy to come in every day. The people are what make Firaxis special, and the small graphics team I was part of was no exception.

### Civilization VII

I joined Firaxis to work on [Civilization VII](https://civilization.2k.com/civ-vii/), and the scope of my contributions reflected that. One of the largest impacts I had on the project was bringing the disparate pieces and unfinished procedural systems together into a cohesive whole. While I started on the project a bit too late to influence their core designs, I was able to introduce a few key components within vegetation placement, building distribution, and river construction that unified how these systems interacted.

Alongside those systems, I worked on the randomized selection of an asset within the asset hierarchy. To give artists more control over how that selection behaved, I integrated a lightweight scripting grammar into the engine. This gave artists key controls over how a procedural asset was expressed according to game state without needing a programmer in the loop, and made iteration much faster.

The biggest individual feature I worked on was the artist-controllable river system. The terrain generator has the ability to treat the underlying height as a continuous field. When I implemented rivers as a series of splines traversing the terrain, I had to ensure that the rivers always flowed downhill through the cuts they made and also blended naturally within this field.

From there, I introduced an asset type to let artists describe the shape and profile of a river, which would then be extruded along the spline using the same scripting system I had built for other procedural assets. The end result was a workflow that let artists create a wide variety of river shapes and styles that always conformed to the artists' intent in a believable way.

On the technical side, I implemented a CPU-based ray tracing library to handle both single and batched intersection queries while letting each use case select the acceleration structure suitable for the job. The single queries were used every frame for mouse picking. Batch queries were used by vegetation and other clutter when those needed to be selectively placed. The generic structure of choice for a majority of the terrain work was, of course, the classic LBVH, which [I had some prior experience with](/portfolio/academic/rensselaer#bachelors-thesis). The fast construction time made it possible to update scenes quickly, which was crucial for immediate visual feedback. The work done here was so successful and performant across the board that I never had to replace the generic 3D BVH with a more specialized 2D structure.

Performance was always a priority, which is a proud keystone of the Civ graphics team. I built benchmarking systems that ran automatically and provided immediate, quantitative feedback to artists about their assets. The game has a substantial number of assets, which were constantly growing, and significant engineering time was spent optimizing the performance of the systems managing them. With the automated feedback, artists could tune their work for the budgets we had set before it became a problem. I also designed the user-facing graphics and AI benchmarks for the product, which worked in tandem with asset performance testing.

I loved the problems the game's engineering efforts attempted to solve. The mixture of performance, scale, and procedural expression is a space I'm passionate about and intend to continue working in.

### Marvel's Midnight Suns

Near the end of [Marvel's Midnight Suns](https://midnightsuns.2k.com/) development, I was pulled in to help push the project over the finish line. I mainly worked on HDR bugs and other related user-facing issues. At this point, it had been a few years since I'd done any Unreal Engine work, so revisiting the HDR compositing pipeline was a welcome way to get reacquainted. The project was using an older, frozen version of UE4, so some of the HDR work in the product was cherry-picked from later engine versions where the HDR pipeline had been improved. I worked to identify and fix issues that had been introduced in the backporting process, as well as some other general bugs that had cropped up over the course of development.
