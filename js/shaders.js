// Credits to Demonin (i just messed with the numbers)
const canvas = document.getElementById('canvasTest');
const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');

const vertexShaderSource = `
  attribute vec4 a_position;
  void main() {
    gl_Position = a_position;
  }
`;

const fragmentShaderSource = `
#ifdef GL_ES
precision mediump float;
#endif

uniform float time;
uniform vec2 resolution;
float scale = 2.5;


vec2 SPR_SIZE = vec2(6, 8);

vec2 c_a = vec2(0x444444, 0x444444);
vec2 c_b = vec2(0x444444, 0x888888);
vec2 c_c = vec2(0x666666,0xbbbbbb);
vec2 c_d = vec2(0xffffff, 0xffffff);

const int NUM_TONES = 8;
vec2 tones[9];

float ch(vec2 ch, vec2 uv)
{
	uv = floor(uv);
	vec2 b = vec2((SPR_SIZE.x - uv.x - 1.0) + uv.y * SPR_SIZE.x) - vec2(24,0);
	float o = float(all(bvec4(greaterThanEqual(uv,vec2(0)), lessThan(uv,SPR_SIZE))));
	return o;
}

void init_arrays()
{
	tones[1] = c_a;
	tones[2] = c_a;
	tones[3] = c_b;
	tones[4] = c_b;
	tones[5] = c_c;
	tones[6] = c_c;
	tones[7] = c_d;
	tones[8] = c_d;
}


vec2 tone(float b)
{
	for(int i = 0;i < NUM_TONES;i++)
	{
		if(b < float(i)/float(NUM_TONES))
		{
			return tones[i];
		}
	}
	
	return tones[NUM_TONES-1];
}

void main( void ) 
{
	init_arrays();
	vec2 fitres = floor(resolution / (SPR_SIZE*scale)) * (SPR_SIZE*scale);	
	vec2 res = floor(resolution.xy / SPR_SIZE) / scale;	
	vec2 uv = floor(gl_FragCoord.xy / scale);
	vec2 uv2 = uv*0.357;
	uv -= (resolution - fitres) / (2.0 * scale);
	
	vec2 tasp = res / min(res.x,res.y);
	vec2 tuv = floor(uv / SPR_SIZE) / min(res.x,res.y);
	tuv.y += sin(time*0.4+tuv.x * 7.0)*0.15;
	
	float plm = sin(tuv.x * 8.0 + sin(tuv.x + tuv.y * 6.0 + time * 0.8) + time*0.6) + cos(tuv.y * 14.0 + cos(tuv.x - tuv.y * 14.0 + time * 0.1));
	plm = sin(plm * 2.0 - 1.0*(-0.1*time+ sin(time*2.0)*2.0));
	plm = (plm / 2.0 + 0.4);
	
	vec2 c = tone(plm);
	
	float pix = ch(c, mod(uv,SPR_SIZE));
	pix=abs(pix)+0.4;
	
	pix *= float(all(greaterThan(uv, vec2(0))) && all(lessThan(uv, fitres / scale)));
	
	gl_FragColor = vec4( vec3(pix*0.3*sin(uv.y*0.008+time*2.0), pix*0.2, pix*0.5), 1.0 );
}
`;

function createShader(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error('An error occurred compiling the shaders:', gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

const shaderProgram = gl.createProgram();
gl.attachShader(shaderProgram, vertexShader);
gl.attachShader(shaderProgram, fragmentShader);
gl.linkProgram(shaderProgram);
gl.useProgram(shaderProgram);

const vertices = new Float32Array([
  -1, -1,
  1, -1,
  -1, 1,
  1, 1
]);

const vertexBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

const a_position = gl.getAttribLocation(shaderProgram, 'a_position');
gl.enableVertexAttribArray(a_position);
gl.vertexAttribPointer(a_position, 2, gl.FLOAT, false, 0, 0);

const resolutionUniformLocation = gl.getUniformLocation(shaderProgram, 'resolution');
const timeUniformLocation = gl.getUniformLocation(shaderProgram, 'time');

function render(timestamp) {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	gl.uniform2f(resolutionUniformLocation, canvas.width, canvas.height);
  gl.uniform1f(timeUniformLocation, timestamp / 1000.0);
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.viewport(0,0, canvas.width, canvas.height);
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  requestAnimationFrame(render);
}

requestAnimationFrame(render);