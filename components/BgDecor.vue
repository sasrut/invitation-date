<template>
  <div class="pointer-events-none fixed inset-0 z-0 overflow-hidden select-none">

    <!-- Floating hearts -->
    <span class="absolute text-xl opacity-45 animate-drift" style="top:12%; left:8%; animation-delay:0s; animation-duration:11s;">💕</span>
    <span class="absolute text-lg opacity-40 animate-drift" style="top:45%; left:3%; animation-delay:1.5s; animation-duration:13s;">💖</span>
    <span class="absolute text-2xl opacity-45 animate-drift" style="top:72%; left:12%; animation-delay:3s; animation-duration:10s;">💗</span>
    <span class="absolute text-base opacity-35 animate-drift" style="top:28%; right:6%; animation-delay:.8s; animation-duration:14s;">💝</span>
    <span class="absolute text-xl opacity-40 animate-drift" style="top:58%; right:4%; animation-delay:2.2s; animation-duration:9s;">🫶</span>
    <span class="absolute text-lg opacity-35 animate-drift" style="top:85%; right:10%; animation-delay:4s; animation-duration:12s;">🩷</span>
    <span class="absolute text-2xl opacity-45 animate-sway" style="top:18%; right:20%; animation-delay:.5s; animation-duration:7s;">💕</span>
    <span class="absolute text-base opacity-35 animate-sway" style="top:65%; left:28%; animation-delay:2.8s; animation-duration:8s;">💗</span>

    <!-- Floating flowers -->
    <span class="absolute text-xl opacity-40 animate-drift" style="top:8%; left:25%; animation-delay:1s; animation-duration:10s;">🌸</span>
    <span class="absolute text-2xl opacity-45 animate-drift" style="top:38%; left:22%; animation-delay:.3s; animation-duration:15s;">🌺</span>
    <span class="absolute text-lg opacity-35 animate-drift" style="top:68%; left:40%; animation-delay:2s; animation-duration:11s;">🌷</span>
    <span class="absolute text-xl opacity-40 animate-drift" style="top:22%; right:18%; animation-delay:1.7s; animation-duration:9s;">🌹</span>
    <span class="absolute text-2xl opacity-45 animate-drift" style="top:52%; right:22%; animation-delay:.6s; animation-duration:13s;">💐</span>
    <span class="absolute text-lg opacity-35 animate-drift" style="top:78%; right:16%; animation-delay:3.5s; animation-duration:12s;">🌼</span>
    <span class="absolute text-base opacity-40 animate-sway" style="top:42%; left:8%; animation-delay:.9s; animation-duration:8s;">🌺</span>
    <span class="absolute text-xl opacity-35 animate-sway" style="top:55%; right:8%; animation-delay:2.5s; animation-duration:7s;">🌸</span>

    <!-- Falling confetti hearts -->
    <span class="absolute text-xs opacity-30 animate-fall-1" style="left:6%; animation-delay:0s;">💕</span>
    <span class="absolute text-xs opacity-30 animate-fall-2" style="left:18%; animation-delay:3s;">💖</span>
    <span class="absolute text-[10px] opacity-25 animate-fall-3" style="left:32%; animation-delay:6s;">💗</span>
    <span class="absolute text-xs opacity-30 animate-fall-1" style="left:50%; animation-delay:2s;">🩷</span>
    <span class="absolute text-[10px] opacity-25 animate-fall-2" style="left:62%; animation-delay:5s;">💝</span>
    <span class="absolute text-xs opacity-30 animate-fall-3" style="left:78%; animation-delay:1s;">🌸</span>
    <span class="absolute text-xs opacity-25 animate-fall-1" style="left:88%; animation-delay:4s;">🌷</span>
    <span class="absolute text-[10px] opacity-30 animate-fall-2" style="left:12%; animation-delay:7s;">💕</span>
    <span class="absolute text-xs opacity-25 animate-fall-3" style="left:42%; animation-delay:8s;">🌹</span>
    <span class="absolute text-[10px] opacity-30 animate-fall-1" style="left:70%; animation-delay:9s;">💗</span>

    <!-- Subtle halftone corners -->
    <div class="halftone text-rose-200 absolute -bottom-6 -right-6 h-28 w-28 opacity-25" />
    <div class="halftone text-rose-100 absolute top-1/2 -left-8 h-24 w-24 opacity-20" />
  </div>
</template>
