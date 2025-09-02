import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Pen, Square, Circle, ArrowRight, Type, Hand, RotateCcw, RotateCw, Download, Trash2 } from 'lucide-react';

const Whiteboard = () => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [tool, setTool] = useState('pen');
  const [strokeColor, setStrokeColor] = useState('#000000');
  const [strokeWidth, setStrokeWidth] = useState(2);
  const [elements, setElements] = useState([]);
  const [currentElement, setCurrentElement] = useState(null);
  const [startPoint, setStartPoint] = useState(null);

  const tools = [
    { id: 'select', icon: Hand, name: 'Select' },
    { id: 'pen', icon: Pen, name: 'Draw' },
    { id: 'rectangle', icon: Square, name: 'Rectangle' },
    { id: 'circle', icon: Circle, name: 'Circle' },
    { id: 'arrow', icon: ArrowRight, name: 'Arrow' },
    { id: 'text', icon: Type, name: 'Text' }
  ];

  const colors = ['#000000', '#e03131', '#2f9e44', '#1971c2', '#f08c00', '#7048e8', '#c2255c'];
  const strokeWidths = [1, 2, 4, 8];

  const getMousePos = useCallback((e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  }, []);

  const drawElement = useCallback((ctx, element) => {
    ctx.strokeStyle = element.strokeColor;
    ctx.lineWidth = element.strokeWidth;
    ctx.fillStyle = 'transparent';
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    switch (element.type) {
      case 'pen':
        if (element.points && element.points.length > 1) {
          ctx.beginPath();
          ctx.moveTo(element.points[0].x, element.points[0].y);
          for (let i = 1; i < element.points.length; i++) {
            ctx.lineTo(element.points[i].x, element.points[i].y);
          }
          ctx.stroke();
        }
        break;
      
      case 'rectangle':
        ctx.beginPath();
        const width = element.endX - element.startX;
        const height = element.endY - element.startY;
        ctx.rect(element.startX, element.startY, width, height);
        ctx.stroke();
        break;
      
      case 'circle':
        const radius = Math.sqrt(
          Math.pow(element.endX - element.startX, 2) + 
          Math.pow(element.endY - element.startY, 2)
        );
        ctx.beginPath();
        ctx.arc(element.startX, element.startY, radius, 0, 2 * Math.PI);
        ctx.stroke();
        break;
      
      case 'arrow':
        const headLength = 15;
        const dx = element.endX - element.startX;
        const dy = element.endY - element.startY;
        const angle = Math.atan2(dy, dx);
        
        // Draw line
        ctx.beginPath();
        ctx.moveTo(element.startX, element.startY);
        ctx.lineTo(element.endX, element.endY);
        ctx.stroke();
        
        // Draw arrowhead
        ctx.beginPath();
        ctx.moveTo(element.endX, element.endY);
        ctx.lineTo(
          element.endX - headLength * Math.cos(angle - Math.PI / 6),
          element.endY - headLength * Math.sin(angle - Math.PI / 6)
        );
        ctx.moveTo(element.endX, element.endY);
        ctx.lineTo(
          element.endX - headLength * Math.cos(angle + Math.PI / 6),
          element.endY - headLength * Math.sin(angle + Math.PI / 6)
        );
        ctx.stroke();
        break;
    }
  }, []);

  const redraw = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw all elements
    elements.forEach(element => drawElement(ctx, element));
    
    // Draw current element being drawn
    if (currentElement) {
      drawElement(ctx, currentElement);
    }
  }, [elements, currentElement, drawElement]);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    redraw();
  }, [redraw]);

  const handleMouseDown = useCallback((e) => {
    if (tool === 'select') return;
    
    const pos = getMousePos(e);
    setIsDrawing(true);
    setStartPoint(pos);

    if (tool === 'pen') {
      const newElement = {
        type: 'pen',
        points: [pos],
        strokeColor,
        strokeWidth
      };
      setCurrentElement(newElement);
    } else {
      const newElement = {
        type: tool,
        startX: pos.x,
        startY: pos.y,
        endX: pos.x,
        endY: pos.y,
        strokeColor,
        strokeWidth
      };
      setCurrentElement(newElement);
    }
  }, [tool, getMousePos, strokeColor, strokeWidth]);

  const handleMouseMove = useCallback((e) => {
    if (!isDrawing || !currentElement) return;

    const pos = getMousePos(e);

    if (tool === 'pen') {
      setCurrentElement(prev => ({
        ...prev,
        points: [...prev.points, pos]
      }));
    } else {
      setCurrentElement(prev => ({
        ...prev,
        endX: pos.x,
        endY: pos.y
      }));
    }
  }, [isDrawing, currentElement, tool, getMousePos]);

  const handleMouseUp = useCallback(() => {
    if (!isDrawing || !currentElement) return;

    setElements(prev => [...prev, currentElement]);
    setCurrentElement(null);
    setIsDrawing(false);
    setStartPoint(null);
  }, [isDrawing, currentElement]);

  const handleClear = () => {
    setElements([]);
    setCurrentElement(null);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const handleSave = () => {
    const canvas = canvasRef.current;
    const link = document.createElement('a');
    link.download = 'whiteboard.png';
    link.href = canvas.toDataURL();
    link.click();
  };

  const handleUndo = () => {
    setElements(prev => prev.slice(0, -1));
  };

  const handleRedo = () => {
    // Simple implementation - in a real app you'd maintain a redo stack
    console.log('Redo functionality would be implemented with a proper history stack');
  };

  useEffect(() => {
    redraw();
  }, [redraw]);

  return (
    <div className="w-full h-[60vh]  flex flex-col rounded-2xl overflow-hidden m-10 mb-0 mt-0">
      {/* Top Toolbar */}
      <div className="bg-white border-b border-gray-200 p-3 flex items-center justify-between ">
        <div className="flex items-center gap-4">
          {/* Tool Selection */}
          <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
            {tools.map((toolItem) => (
              <button
                key={toolItem.id}
                onClick={() => setTool(toolItem.id)}
                className={`p-2 rounded-md transition-colors ${
                  tool === toolItem.id
                    ? 'bg-blue-500 text-white shadow-sm'
                    : 'text-gray-600 hover:bg-gray-200'
                }`}
                title={toolItem.name}
              >
                <toolItem.icon size={18} />
              </button>
            ))}
          </div>

          {/* Stroke Width */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Stroke:</span>
            <div className="flex items-center gap-1">
              {strokeWidths.map((width) => (
                <button
                  key={width}
                  onClick={() => setStrokeWidth(width)}
                  className={`w-8 h-8 rounded-md flex items-center justify-center transition-colors ${
                    strokeWidth === width
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  <div
                    className="bg-current rounded-full"
                    style={{
                      width: `${Math.max(2, width)}px`,
                      height: `${Math.max(2, width)}px`
                    }}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Colors */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Color:</span>
            <div className="flex items-center gap-1">
              {colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setStrokeColor(color)}
                  className={`w-8 h-8 rounded-md border-2 transition-all ${
                    strokeColor === color
                      ? 'border-gray-400 scale-110'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleUndo}
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
            title="Undo"
          >
            <RotateCcw size={18} />
          </button>
          <button
            onClick={handleRedo}
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
            title="Redo"
          >
            <RotateCw size={18} />
          </button>
          <div className="w-px h-6 bg-gray-300 mx-1" />
          <button
            onClick={handleSave}
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
            title="Save"
          >
            <Download size={18} />
          </button>
          <button
            onClick={handleClear}
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
            title="Clear All"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      {/* Canvas Area */}
      <div className="flex-1 relative overflow-hidden">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full bg-white cursor-crosshair"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={() => {
            setIsDrawing(false);
            setCurrentElement(null);
          }}
        />
        
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px'
          }}
        />
      </div>

      {/* Status Bar */}
      <div className="bg-white border-t border-gray-200 px-4 py-2 text-sm text-gray-500 flex items-center justify-between">
        <div>Tool: {tools.find(t => t.id === tool)?.name}</div>
        <div>Elements: {elements.length}</div>
      </div>
    </div>
  );
};

export default Whiteboard;