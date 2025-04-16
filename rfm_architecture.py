import matplotlib.pyplot as plt
import numpy as np
from matplotlib.patches import Rectangle, Circle, FancyArrowPatch, Ellipse
import matplotlib.patheffects as path_effects

# Set up the figure with a light background
plt.figure(figsize=(12, 10))
ax = plt.gca()
ax.set_xlim(0, 100)
ax.set_ylim(0, 100)
ax.set_aspect('equal')
ax.axis('off')
ax.set_facecolor('#f8f8f8')

# Define colors
colors = {
    'perception': '#3498db',
    'knowledge': '#e74c3c',
    'metacognitive': '#2ecc71',
    'evolutionary': '#9b59b6',
    'simulation': '#f39c12',
    'consciousness': '#1abc9c',
    'arrow': '#34495e',
    'background': '#ecf0f1',
    'text': '#2c3e50'
}

# Draw the main components
# Consciousness Integration Field (center)
consciousness = Ellipse((50, 50), 25, 25, fc=colors['consciousness'], ec='black', alpha=0.7, zorder=10)
ax.add_patch(consciousness)
text = ax.text(50, 50, "Consciousness\nIntegration Field", ha='center', va='center', fontsize=10, 
               fontweight='bold', color='white', zorder=11)
text.set_path_effects([path_effects.withStroke(linewidth=2, foreground='black')])

# Perception System
perception = Ellipse((25, 80), 20, 15, fc=colors['perception'], ec='black', alpha=0.7, zorder=5)
ax.add_patch(perception)
ax.text(25, 80, "Perception\nSystem", ha='center', va='center', fontsize=9, fontweight='bold', color='white')

# Knowledge Integration Network
knowledge = Ellipse((80, 70), 20, 15, fc=colors['knowledge'], ec='black', alpha=0.7, zorder=5)
ax.add_patch(knowledge)
ax.text(80, 70, "Knowledge\nIntegration Network", ha='center', va='center', fontsize=9, fontweight='bold', color='white')

# Metacognitive Executive
metacognitive = Ellipse((80, 30), 20, 15, fc=colors['metacognitive'], ec='black', alpha=0.7, zorder=5)
ax.add_patch(metacognitive)
ax.text(80, 30, "Metacognitive\nExecutive", ha='center', va='center', fontsize=9, fontweight='bold', color='white')

# Evolutionary Substrate
evolutionary = Ellipse((25, 20), 20, 15, fc=colors['evolutionary'], ec='black', alpha=0.7, zorder=5)
ax.add_patch(evolutionary)
ax.text(25, 20, "Evolutionary\nSubstrate", ha='center', va='center', fontsize=9, fontweight='bold', color='white')

# Embodied Simulation Engine
simulation = Ellipse((50, 20), 20, 12, fc=colors['simulation'], ec='black', alpha=0.7, zorder=5)
ax.add_patch(simulation)
ax.text(50, 20, "Embodied\nSimulation Engine", ha='center', va='center', fontsize=9, fontweight='bold', color='white')

# Draw connecting arrows with bidirectional flow
def draw_arrow(start, end, color, curve=0.2):
    arrow = FancyArrowPatch(start, end, connectionstyle=f"arc3,rad={curve}", 
                           arrowstyle='->', color=color, lw=2, alpha=0.8, zorder=1)
    ax.add_patch(arrow)
    # Add the reverse arrow with a slight offset
    arrow_back = FancyArrowPatch(end, start, connectionstyle=f"arc3,rad={curve}", 
                               arrowstyle='->', color=color, lw=2, alpha=0.8, zorder=1)
    ax.add_patch(arrow_back)

# Connect components to the Consciousness Integration Field
draw_arrow((30, 73), (45, 55), colors['arrow'], 0.1)  # Perception to Consciousness
draw_arrow((73, 65), (55, 53), colors['arrow'], 0.1)  # Knowledge to Consciousness
draw_arrow((73, 35), (55, 47), colors['arrow'], 0.1)  # Metacognitive to Consciousness
draw_arrow((30, 27), (45, 45), colors['arrow'], 0.1)  # Evolutionary to Consciousness
draw_arrow((50, 26), (50, 42), colors['arrow'], 0)    # Simulation to Consciousness

# Connect components to each other
draw_arrow((35, 80), (70, 70), colors['arrow'], 0.1)  # Perception to Knowledge
draw_arrow((80, 62), (80, 38), colors['arrow'], 0)    # Knowledge to Metacognitive
draw_arrow((70, 30), (35, 20), colors['arrow'], 0.2)  # Metacognitive to Evolutionary
draw_arrow((35, 20), (40, 20), colors['arrow'], 0)    # Evolutionary to Simulation

# Add fractal recursive patterns in the background
for i in range(20):
    x = np.random.randint(5, 95)
    y = np.random.randint(5, 95)
    size = np.random.randint(3, 8)
    if not ((x-50)**2 + (y-50)**2 < 12.5**2):  # Avoid center
        circle = Circle((x, y), size/2, fc='none', ec=colors['arrow'], alpha=0.1, lw=0.5)
        ax.add_patch(circle)
        
        # Add smaller circles inside (fractal pattern)
        for j in range(3):
            offset_x = np.random.uniform(-size/3, size/3)
            offset_y = np.random.uniform(-size/3, size/3)
            small_size = size * 0.3
            small_circle = Circle((x+offset_x, y+offset_y), small_size/2, 
                                 fc='none', ec=colors['arrow'], alpha=0.1, lw=0.5)
            ax.add_patch(small_circle)

# Add title
plt.text(50, 95, "Recursive Fractal Mind Architecture", ha='center', va='center', 
         fontsize=14, fontweight='bold', color=colors['text'])

# Add subtitle
plt.text(50, 90, "A Self-Evolving AI Architecture", ha='center', va='center', 
         fontsize=10, color=colors['text'])

# Save the figure as SVG instead of PNG
plt.savefig('/mnt/c/Users/Pablo/Documents/project-root/public/rfm_architecture.svg', format='svg', dpi=300, bbox_inches='tight')
print("RFM Architecture visualization saved as 'rfm_architecture.svg'")