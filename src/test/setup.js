import '@testing-library/jest-dom';

// Mock WebGLRenderingContext for Three.js in JSDOM
if (typeof window !== 'undefined') {
  // Basic canvas mock
  const createCanvas = () => {
    const canvas = document.createElement('canvas');
    canvas.getContext = (type) => {
      if (type === 'webgl' || type === 'webgl2' || type === 'experimental-webgl') {
        return {
          // minimal stub for WebGL context
          clear: () => {},
          clearColor: () => {},
          enable: () => {},
          disable: () => {},
          getExtension: () => null,
          viewport: () => {},
          createShader: () => ({}),
          shaderSource: () => {},
          compileShader: () => {},
          createProgram: () => ({}),
          attachShader: () => {},
          linkProgram: () => {},
          useProgram: () => {},
          getProgramParameter: () => true,
          getShaderParameter: () => true,
          getShaderInfoLog: () => '',
          getProgramInfoLog: () => '',
          createBuffer: () => ({}),
          bindBuffer: () => {},
          bufferData: () => {},
          drawArrays: () => {},
        };
      }
      return {};
    };
    return canvas;
  };

  // Stub WebGLRenderer DOM creation calls by ensuring canvas exists
  Object.defineProperty(document, 'createElement', {
    value: (orig => function(type, options) {
      if (type === 'canvas') return orig.call(this, type, options);
      return orig.call(this, type, options);
    })(document.createElement),
    configurable: true,
    writable: true
  });
}

// Suppress Three.js warnings in test output
const warn = console.warn;
console.warn = (...args) => {
  if (typeof args[0] === 'string' && args[0].includes('THREE.WebGLRenderer')) return;
  warn(...args);
};
