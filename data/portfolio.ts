export const PROJECTS_DATA = [
  {
    slug: 'autonomous-navigation-stack',
    title: 'Autonomous Navigation Stack',
    type: 'Hardware & Software',
    shortDescription: 'Autonomous Rover with 3D-printed components, trained for object detection.',
    detailedContent: `
# Autonomous Navigation Stack

This project involved building an autonomous rover from scratch, utilizing 3D-printed components for the chassis and a Rocker-Bogie mechanism for superior terrain stability.

## Key Features
- **Object Detection**: Custom trained ML models using TensorFlow to identify obstacles and targets.
- **Navigation Stack**: Configured ROS2 Nav2 stack for dynamic path planning in unmapped environments.
- **Hardware Integration**: NVIDIA Jetson Nano for edge computing, interfacing with custom motor controllers.

## Architecture
The system uses a distributed ROS2 node architecture, allowing the perception, planning, and control modules to operate asynchronously.
    `,
    tags: ['ROS2', 'NavStack', 'Jetson', 'ML'],
    images: [
      'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=2000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2000&auto=format&fit=crop'
    ],
    githubUrl: 'https://github.com',
    demoUrl: '#'
  },
  {
    slug: 'dwa-local-planner',
    title: 'DWA Local Planner',
    type: 'Software',
    shortDescription: 'Custom Local DWA Planner implemented from scratch in C++.',
    detailedContent: `
# Dynamic Window Approach (DWA) Local Planner

Instead of relying on the standard ROS navigation packages, I implemented a custom DWA local planner from scratch in C++ to achieve tighter control in highly constrained environments.

## Implementation Details
- Written purely in modern C++ (C++17).
- Integrated directly with Gazebo simulation environments for testing.
- Features dynamic obstacle avoidance based on real-time LiDAR point clouds.
- Highly optimized trajectory rollout evaluations.
    `,
    tags: ['C++', 'Gazebo', 'RViz'],
    images: [
      'https://images.unsplash.com/photo-1555255707-c07966088b7b?q=80&w=2000&auto=format&fit=crop'
    ],
    githubUrl: 'https://github.com',
    demoUrl: '#'
  }
]

export const PUBLICATIONS_DATA = [
  {
    slug: 'visual-slam-performance',
    title: 'Assessing the Visual SLAM performance in Autonomous Mobile Robots',
    type: 'Journal',
    publisher: 'Wiley',
    date: 'March 2026',
    shortDescription: 'A comprehensive study on adaptive GMapping and Cartography for visual SLAM.',
    abstract: 'This paper presents a comprehensive study on the performance of various Visual SLAM (Simultaneous Localization and Mapping) algorithms, specifically focusing on adaptive GMapping and Google Cartographer in highly dynamic environments. We provide quantitative benchmarks on CPU usage, trajectory error, and map entropy.',
    authors: 'Brahma Teja Jampu, Dr. Heinz',
    doiUrl: 'https://doi.org/...',
    pdfUrl: '/placeholder.pdf' // In reality, this would be a URL to a real PDF
  },
  {
    slug: 'robotic-surgery-integration',
    title: 'Integrating robotic surgery and pharmacotherapy',
    type: 'Journal',
    publisher: 'Elsevier',
    date: 'January 2024',
    shortDescription: 'A dual approach to lung cancer management utilizing advanced robotic surgical precision.',
    abstract: 'This research explores the intersection of high-precision robotic surgery systems with localized pharmacotherapy delivery mechanisms. By integrating real-time computer vision with robotic manipulators, we demonstrate a 15% increase in targeted delivery efficiency.',
    authors: 'Jane Doe, Brahma Teja Jampu',
    doiUrl: 'https://doi.org/...',
    pdfUrl: '/placeholder.pdf'
  }
]
