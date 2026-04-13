#version 300 es

in vec2 a_position;
in vec2 a_velocity;
in float a_life;
in float a_size;

out vec2 v_position;
out vec2 v_velocity;
out float v_life;
out float v_size;

uniform float u_deltaTime;
uniform vec2 u_mouse;
uniform float u_mouseAttract;
uniform float u_speed;
uniform float u_turbulence;
uniform float u_time;
uniform float u_damping;
uniform float u_lifeDecay;

// Simple hash for pseudo-random
float hash(float n) {
    return fract(sin(n) * 43758.5453123);
}

void main() {
    vec2 pos = a_position;
    vec2 vel = a_velocity;
    float life = a_life;
    float size = a_size;

    float dt = u_deltaTime * u_speed;

    // Mouse attraction/repulsion
    vec2 toMouse = u_mouse - pos;
    float dist = length(toMouse);
    if (dist > 0.001) {
        vel += normalize(toMouse) * u_mouseAttract * dt / (dist * 5.0 + 0.1);
    }

    // Turbulence (simple pseudo-noise based on position and time)
    float angle = hash(dot(pos, vec2(12.9898, 78.233)) + u_time) * 6.28318;
    vel += vec2(cos(angle), sin(angle)) * u_turbulence * dt;

    // Damping
    vel *= (1.0 - u_damping * dt);

    // Integrate
    pos += vel * dt;

    // Life decay
    life -= u_lifeDecay * dt;

    // Respawn dead particles at mouse position
    if (life <= 0.0) {
        pos = u_mouse + vec2(
            hash(float(gl_VertexID) + u_time * 1.1) - 0.5,
            hash(float(gl_VertexID) + u_time * 2.3) - 0.5
        ) * 0.05;
        vel = vec2(
            hash(float(gl_VertexID) + u_time * 3.7) - 0.5,
            hash(float(gl_VertexID) + u_time * 5.1) - 0.5
        ) * 0.3;
        life = 0.5 + hash(float(gl_VertexID) + u_time * 7.9) * 0.5;
        size = 1.0 + hash(float(gl_VertexID) + u_time * 9.3) * 3.0;
    }

    // Wrap around
    pos = fract(pos + 1.0);

    v_position = pos;
    v_velocity = vel;
    v_life = life;
    v_size = size;
}
