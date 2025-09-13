---
title: Rensselaer Polytechnic Institute (RPI)
description: B.S in Computer Science
start_date: 2014-08-01
end_date: 2018-05-01
location: Troy, NY
link: https://www.rpi.edu/
robots: false
---

## Academic Projects

My time at Rensselaer was spent trying to shove a project into every class I took.

### Bachelors Thesis

***Multiple Coordinate System LBVHs for Ray Tracing***

Advised by Dr. Barb Cutler
Jan. 2018 - May 2018

Developed a modified Linear Bounding Volume Hierarchy for ray queries that allows the representation of objects of
very different scales (e.g. galaxies and small satellites) to coexist in a scene using a nested coordinate system.
Created a support library for non-power-of-two integer bit lengths on the GPU, enabling efficient memory usage.
Presented the paper at a poster session to RPI peers and professors.

### Atmosphere Rendering

***Heterogeneous Atmosphere Volume Rendering***

Computer Graphics Project
Nov. 2016 – Dec. 2016
Populated an atmosphere with NASA’s Earth data and visualized it with Rayleigh and Mie light scattering.
Implemented heterogenous volume sampling with variable length ray marching for real-time rendering on the GPU.

### Vocal Simulation

***Vocal Intonation via Fluid Simulation***

I took the class Affective Computing in the heyday of classical deep learning and it was being applied to everything, and in this case, the context of categorizing human emotion. For the final project of the class we were tasked to apply one of the various taxonomies of emotion we covered to any data to create a classifier for that taxonomy. This process would further explore the relationship between emotion and other variables in the dataset.

Within the year prior to this class I had fallen in love with generating vocals with ML, but not in the classical sense of text-to-speech. I was more interested in the raw audio generation and manipulation of voice. I would imagine how the parameters of a black box simulation could affect the breathing cadence of speech in response to a character running or walking, or how elocution would require breathes, affecting the overall delivery of a speech model. This project was a perfect opportunity to explore that interest while also fulfilling the class requirements.

Forgoing the expected project structure of using existing dataset for my own classification, I decided to generate my own data via a fluid simulation. In this 2D simulation I had a parameterized vocal tract represented as a column of varying width with a vibrating vocal cord at one end. The input pressure of the other end of the vocal tract was also parameterized to represent the lungs. The fluid simulation would then simulate the pressure changes in the vocal tract and output audio based on those pressure changes at the simulation's mouth.

With blast of pressure change and a specific shape of the vocal tract I sent the resulting audio clip through a third-party pre-trained model that classified the emotional content of audio clips into a single output emotion. The emotion classification was then fed back into the simulation alongside a target emotion. Here I introduced my ML model which would modify the parameters of the vocal tract and pressure input to try to match the target emotion. This model was genetic and created a feedback loop with the simulation.

With this generative model I could explore how the parameters of the vocal tract and pressure input would change in response to an emotional target. The resulting shape of the vocal tract after a stable iteration was reached could be compared with known classifications of phoneme tract shapes, their common frequencies in speech, and validated against.

At this point it was clear there was a serious setup flaw in this experiment. If I was just pushing pressure into the system with a single tract shape that doesn't evolve throughout the clip the output would be variations of a single sound. The third-party model was trained on human speech, not the raw phonemic sounds I was generating. This meant that the model would be trying to classify audio akin to bare waveforms and would likely produce garbage results instead of an proper emotional classification. However, I forged ahead with the experiment anyway.

Each simulation timeframe was ten seconds long of variable pressure changes with a static vocal tract. The fluid simulation was implemented on the GPU with CUDA using a naive Navier-Stokes solver at a grid resolution of 256x512 cells. A single simulation wasn't quite real-time on low specification hardware from 2016. Each genetic iteration would run 50 simulations with random starting parameters and the top 10 results would persist to the next generation. In total, I ran 20 generations per target emotion.

Despite the flawed setup there was some interesting results. When requested to express anger the model would apply high pressure input, constrict the vocal tract near the chords, and vibrate the chords at a high frequency. The result was nearly a sawtooth wave. When asked to express happiness the model would produce a sinusoidal wave at a lower volume.

The third-party model by chance sufficiently classified the various starting input as separate categories of emotion despite not having sufficient data to do so beyond single, janky phonemes. Therefore my model was able to also diversify the input parameters enough to trigger those different classifications.

What was impressive, however, was that the waveforms did not sound purely artificial. The simulation ended up creating a guttural scream. It was truly in an uncanny valley. From a technical standpoint the audio output was leagues cooler than anything I could try and synthesized manually despite the simplicity of the simulation.

In the end this project created an inferior and immensely inefficient way of generating simple phonemes. It sure was fun though.

---

## Courses

There were a few gems in the curriculum that I really enjoyed. The time I spent in them assured me that I choose the right specialty when I first start pursuing the subfield of computer graphics in high school.

### Graphics

***Advanced Computer Graphics - CSCI 4530***

Taught by Dr. Barb Cutler, this class was a deep dive into the theory and practice of computer graphics. We covered a smattering of topics from the physics simulation to ray tracing and global illumination. Her teaching was legendary.

### Geometry

***Fundamentals of Geometry - MATH 4120***

This class was a Math department offering and required mathematical rigor that I didn't have and still don't have. However, I managed to sneak into the class and learn a lot about the underlying principles of differential geometry that I found elsewhere in my own field.

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
