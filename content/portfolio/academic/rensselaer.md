---
title: Rensselaer Polytechnic Institute (RPI)
description: B.S in Computer Science
start_date: 2014-08-01
end_date: 2018-05-01
location: Troy, NY
link: https://www.rpi.edu/
---

## Academic Projects

My time at Rensselaer was spent trying to shove a project into every class I took.

### Bachelors Thesis

***Multiple Coordinate System LBVHs for Ray Tracing***

As a senior capstone project I had the opportunity to work on and present my own informal research under the guidance of Dr. Barb Cutler over the course of a semester. Previously, I had implemented the construction of a Linear Bounding Volume Hierarchy (LBVH) on the GPU for accelerated ray tracing of 3D scenes. My implementation was based on Apetrei et al.'s work, "Fast and Simple Agglomerative LBVH Construction"[^apetrei2014]. From there I had a final project in the Advanced Computer Graphics course that laid the groundwork for extending that work for arbitrarily large scene sizes, and ultimately this capstone.

To quickly revisit what an LBVH is, it is a bounding volume hierarchy that linearizes a geometric scene for efficient traversal. While the traversal performance of an LBVH is not as efficient as other BVH varieties, it is by comparison extremely fast to construct. As long as there is some sort of spatial ordering of the data, the LBVH construction can even be trivially parallelized as Karras in prior work shows.[^karras2012] This makes it ideal for dynamic scenes where the BVH must be rebuilt every frame.

Primarily, the linearization process for spatial data uses Morton codes which are cheap to construct and provide decent spatial coherence. My extension to the LBVH construction was to take advantage of the Morton codes' ability to interleave arbitrarily sized integers. As long as there is a bidirectional mapping between the geometry data in its object space and the Morton code representing it within a global coordinate system, the LBVH construction can be performed in that global space.

The traversal between a parent and child node in the hierarchy also needs to be bidirectional. In classical ray tracing rays are fired from the camera into the scene. Given the position of the camera exists in the same global coordinate space as the hierarchy, the camera itself needs to participate in the BVH build so it can also create it's own object space within the hierarchy. Rays traversal therefore starts at one of the leaf nodes in the hierarchy where the camera resides, traverses up to the root, and then back down to intersect with the scene's geometry.

I took inspiration from BVH compression techniques to maintain the bidirectional mapping from a parent bounding box to its children. As long as bounding boxes are conservative over the span of their children, each child can be represented in a normalized local space of their parent. The children just become offsets into that parent space where traversal requires an additional space transformation.

This approach allowed me to build a single LBVH for a scene of arbitrary size and complexity. The only limitation was the precision of the quantization scheme, the morton encoding. I implemented this system in CUDA with the support of a custom big integer library and demonstrated it with a simple ray tracer. The results were promising, showing that the LBVH could handle large scenes while maintaining interactive performance on a 1080 GPU.

The construction and traversal timings were both nearly double that of the baseline LBVH implementation just for the corresponding operations. Including the upwards traversal and the additional big integer processing, construction and traversal were four times as expensive. The overhead of maintaining the bidirectional mappings added complexity to the traversal algorithm, none of which I was able to optimize or fully resolve within the project's timeline.

Additionally, there were implementation bugs that I was unable to fully address. There were edge cases where geometry would incorrectly be excluded from the hierarchy. I wasn't properly able to debug this issue but it stemmed from my mapping scheme not being truly bijective due to my incorrect choice of floating-point quantization.

I presented the paper at a poster session to RPI peers and professors and spent a good deal of time talking about the failures of the project. While I was proud of the work I had done, I was also acutely aware of its shortcomings. The experience taught me a lot about the research process and how to manage expectations when working on open-ended problems.

There was still a lot of joy found working and conversing about the project with others despite its eventual shortcomings. I am so grateful to Dr. Cutler for engaging in that conversation and teaching me so much about the research process.

### Atmosphere Rendering

***Heterogeneous Atmosphere Volume Rendering***

When taking the astronomy elective Earth and Sky, I visited the challenge of aligning my interests to the course's project requirements. The class emphasized observational astronomy, focusing on celestial phenomena as seen through telescopes and the naked eye. For the final project, I chose to explore the rendering of Earth’s atmosphere as observed from the ground.

To better match the astronomy focus, I approached the atmosphere from a data-driven perspective. Using NASA’s measurements of atmospheric composition across altitudes, I built a multi-layered model that captured the varying densities and gas mixtures at different heights. I also exposed the size of the underlying planetary sphere as a configurable parameter. The ultimate goal was to achieve a real-time visualization.

The rendering relied on classic Rayleigh and Mie scattering, implemented through ray marching. For each pixel, a ray was cast into the scene and advanced in steps. At each step, the gas densities were sampled and used to calculate scattering coefficients, which determined the in-scattering and out-scattering contributions of light. These contributions were accumulated to produce the final pixel color.

A key challenge was balancing accuracy with performance. Naively sampling at fixed intervals would either overwhelm the hardware with too many steps or underrepresent the role of certain gases with too few. To address this, I exploited the atmosphere’s layered structure. For each layer, I precomputed optimized step sizes: denser lower layers generally required finer sampling, while thinner upper layers permitted larger steps. This also held true within a single layer, ensuring higher sampling near boundaries where gas composition changed rapidly.

This approach allowed me to capture the complexity of atmospheric scattering while maintaining real-time rendering performance. Running on a 750Ti, I was able to hit my VSync target of 16.6ms per frame.

### Vocal Simulation

***Vocal Intonation via Fluid Simulation***

I took the class Affective Computing in the heyday of classical deep learning. Deep learning was being applied to everything and for this class it was the context of categorizing human emotion. For the final project of the class we were tasked to apply one of the various taxonomies of emotion we covered to any data to create a classifier for that taxonomy. This process would further explore the relationship between emotion and other variables in the dataset.

Within the year prior to this class I had fallen in love with generating vocals with ML, but not in the classical sense of text-to-speech. I was more interested in the raw audio generation and manipulation of voice. I would imagine how the parameters of a black box simulation could affect the breathing cadence of speech in response to a character running or walking, or how elocution would require breathes, affecting the overall delivery of a speech model. This project was a perfect opportunity to explore that interest while also fulfilling the class requirements.

Forgoing the expected project structure of using existing dataset for my own classification, I decided to generate my own data via a fluid simulation. In this 2D simulation I had a parameterized vocal tract represented as a column of varying width with a vibrating vocal cord at one end. The input pressure of the other end of the vocal tract was also parameterized to represent the lungs. The fluid simulation would then simulate the pressure changes in the vocal tract and output audio based on those pressure changes at the simulation's mouth.

With blast of pressure change and a specific shape of the vocal tract I sent the resulting audio clip through a third-party pre-trained model that classified the emotional content of audio clips into a single output emotion. The emotion classification was then fed back into the simulation alongside a target emotion. Here I introduced my ML model which would modify the parameters of the vocal tract and pressure input to try to match the target emotion. This model was genetic and created a feedback loop with the simulation.

With this generative model I could explore how the parameters of the vocal tract and pressure input would change in response to an emotional target. The resulting shape of the vocal tract after a stable iteration was reached could be compared with known classifications of phoneme tract shapes, their common frequencies in speech, and validated against.

At this point it was clear there was a serious setup flaw in this experiment. If I was just pushing pressure into the system with a single tract shape that doesn't evolve throughout the clip the output would be variations of a single sound. The third-party model was trained on human speech, not the raw phonemic sounds I was generating. This meant that the model would be trying to classify audio akin to bare waveforms and would likely produce garbage results instead of an proper emotional classification. However, I forged ahead with the experiment anyway.

Each simulation timeframe was ten seconds long of variable pressure changes with a static vocal tract. The fluid simulation was implemented on the GPU with CUDA using a naive, incompressable Navier-Stokes solver at a grid resolution of 256x512 cells. A single simulation wasn't quite real-time on low specification hardware from 2016. Each genetic iteration would run 50 simulations with random starting parameters and the top 10 results would persist to the next generation. In total, I ran 20 generations per target emotion.

Despite the flawed setup there was some interesting results. When requested to express anger the model would apply high pressure input, constrict the vocal tract near the cords, and vibrate the cords at a high frequency. The result was nearly a sawtooth wave. When asked to express happiness the model would produce a sinusoidal wave at a lower volume.

The third-party model by chance sufficiently classified the various starting input as separate categories of emotion despite not having sufficient data to do so beyond single, janky phonemic-like outputs. Therefore my model was able to also diversify the input parameters enough to trigger those different classifications.

What was impressive, however, was that the waveforms did not sound purely artificial. The simulation ended up creating a guttural scream. It was truly in an uncanny valley. From a technical standpoint the audio output was leagues cooler than anything I could try and synthesized manually despite the simplicity of the simulation.

In the end this project created an inferior and immensely inefficient way of generating simple phonemes. It was fun to explore the intersection of fluid simulation, audio synthesis, and machine learning as a technical interest.

---

## Clubs

I took part is various intramural sports and events, but two clubs were the pillars of my extracurricular fun at good-old RPI.

### RCOS

***Rensselaer Center for Open Source***

![RCOS Logo](/images/rcos-red.png){width="300"}

  Half credited class, half club, RCOS brought together a community of students interested in open source software development. The class not only provided the knowledge and resources to understand the how and why of open source, but also the mentorship and external connections to get involved in real world projects. [Soul Engine](/portfolio/project/soul-engine) had some of its first work done as a RCOS project with the help, contributions, and support of that community.

::UButton{label="Visit RCOS Organization" to="https://github.com/rcos" target="_blank" variant="ghost" size="xs" trailing-icon="i-heroicons-arrow-top-right-on-square"}
::

### ROC

***Rensselaer Outing Club***

![ROC Logo](/images/roc-logo.png){width="300"}

It took me years to warm up to hiking for fun, but once I dipped my toes into the Outing Club, I was yanked into the scene. ROC organizes trips nearly every weekend and I will always remember my first hikes into the Adirondacks and the local Taconic Range. Having those nearby outdoor experiences to grow and make mistakes in a safe and supportive way led to me spending extensive time in nature in my twenties. That time truly ended up being a highlight.

::UButton{label="Visit ROC Website" to="https://outing.org/" target="_blank" variant="ghost" size="xs" trailing-icon="i-heroicons-arrow-top-right-on-square"}
::

## References

[^apetrei2014]: Apetrei, C. (2014). *Fast and Simple Agglomerative LBVH Construction*. In Borgo, R. and Tang, W. (eds.), Computer Graphics and Visual Computing (CGVC). The Eurographics Association.

[^karras2012]: Karras, T. (2012). *Maximizing Parallelism in the Construction of BVHs, Octrees, and K-d Trees*. In Proceedings of the Fourth ACM SIGGRAPH / Eurographics Conference on High-Performance Graphics (HPG '12), pp. 33–37. Eurographics Association.
