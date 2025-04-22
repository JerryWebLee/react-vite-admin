import { useEffect, useRef } from "react";

export default function SubNav1() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl");
    if (!gl) {
      throw new Error("WebGL not supported");
    }
    canvas.width = wrapperRef.current?.clientWidth || 300;
    canvas.height = wrapperRef.current?.clientHeight || 300;
    // 指定清空缓冲区，可以是颜色缓冲区、深度缓冲区、模板缓冲区等
    // gl.clearColor(r, g, b, a) 设置清空颜色缓冲区时的颜色
    // gl.clearDepth(depth) 设置清空深度缓冲区时的深度值
    // gl.clearStencil(s) 设置清空模板缓冲区时的模板值
    // gl.clear(mask) 清空缓冲区
    // mask: gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT | gl.STENCIL_BUFFER_BIT
    gl.clearColor(0.0, 0.0, 1.0, 1.0);

    gl.clear(gl.COLOR_BUFFER_BIT);
  }, []);
  return (
    <div
      style={{
        width: "100%",
        height: 600,
      }}
      ref={wrapperRef}
    >
      <canvas ref={canvasRef} />
    </div>
  );
}
