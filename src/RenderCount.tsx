let renderCount = 0;

export default function RenderCount() {
  renderCount++;

  return <div>Render count: {renderCount}</div>;
}
