/**
 * Class representing one single water particle
 */
class Particle {
    static particles = [];

    /**
     * 
     * @param position Initial position of the particle
     * @param velocity Initial magnitude of the velocity of the particle
     * @param angle Angle from the vertical axis
     * @param color Color of the particle
     */
    constructor(position, velocity, angle, color, thickness) {
        this.position = position;
        this.velocity = p5.Vector.fromAngle(angle + PI/2, velocity);
        this.color = color;
        this.thickness = thickness;
    }

    /**
     * Add the given particle to the sistem
     * 
     * @param p 
     */
    static add(p) {
        this.particles.push(p);
    }

    /**
     * Update the system
     * 
     * @param gravity Gravity to be applied
     */
    static update(gravity) {
        for(let i = this.particles.length - 1; i >= 0; i--) {
            // Update particle position and velocity
            this.particles[i].updateParticle(gravity);
            // If particle is out of bounds delete it
            if(this.particles[i].position.y < -10) {
                this.particles.splice(i,1);
            }
        }
    }
    
    /**
     * Draw all particles
     */
    static draw() {
        for(let p of this.particles) {
            p.drawParicle();
        }
    }

    /**
     * Update single particle
     * 
     * @param gravity Gravity to be applied
     */
    updateParticle(gravity) {
        this.position.add(this.velocity);
        this.velocity.add(gravity);
    }

    /**
     * Draw single particle
     */
    drawParicle() {
        strokeWeight(this.thickness);
        stroke(this.color);
        point(this.position.x, this.position.y);
    }
}