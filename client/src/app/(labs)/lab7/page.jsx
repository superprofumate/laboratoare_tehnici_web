"use client"

import context from './draw.js';
import { useEffect, useState } from 'react';
import Button from '@/components/ui/button/button.jsx';
import { TbReload } from "react-icons/tb";

export default function Lab7() {
  const {
    clearTable,
    drawTable,
    colorCol,
    colorRow,
    rainbow,
    drawPixel,
    drawLine,
    drawRect,
    drawPixelExt,
    drawPixelAmount,
    delRow,
    delCol,
    shiftRow,
    jumble,
    transpose,
    mirror,
    smear,
    blur
  } = context();

  const buttons = [
    { id: 0, label: 'Draw by col', trigger: colorCol, type: 'input', fields: ['col', 'color'] },
    { id: 1, label: 'Draw by row', trigger: colorRow, type: 'input', fields: ['row', 'color'] },
    { id: 2, label: 'Rainbow', trigger: rainbow, type: 'radio', fields: ['horizontal', 'vertical'] },
    { id: 3, label: 'Draw a pixel', trigger: drawPixel, type: 'input', fields: ['row', 'col', 'color'] },
    { id: 4, label: 'Draw a line', trigger: drawLine, type: 'input', fields: ['r1', 'c1', 'r2', 'c2', 'color'] },
    { id: 5, label: 'Draw a rectangle', trigger: drawRect, type: 'input', fields: ['r1', 'c1', 'r2', 'c2', 'color'] },
    { id: 6, label: 'Draw pixel (extended)', trigger: drawPixelExt, type: 'input', fields: ['row', 'col', 'color']  },
    { id: 7, label: 'Draw pixel amount', trigger: drawPixelAmount, type: 'input', fields: ['row', 'col', 'color', 'amount'] },
    { id: 8, label: 'Delete a row', trigger: delRow, type: 'input', fields: ['row'] },
    { id: 9, label: 'Delete col', trigger: delCol, type: 'input', fields: ['col'] },
    { id: 10, label: 'Shift row', trigger: shiftRow, type: 'input', fields: ['row', 'pos'] },
    { id: 11, label: 'Jumble', trigger: jumble, type: 'button' },
    { id: 12, label: 'Transpose', trigger: transpose, type: 'button' },
    { id: 14, label: 'Mirror', trigger: mirror, type: 'radio', fields: ['vertical', 'horizontal'] },
    { id: 15, label: 'Smear', trigger: smear, type: 'input', fields: ['row', 'col', 'amount'] },
    { id: 16, label: 'Blur', trigger: blur, type: 'button' },
  ];

  const nrows = 30;
  const ncols = 30;

  useEffect(() => {
    drawTable(nrows, ncols);
  }, [drawTable]);

  const [openPopUp, setOpenPopUp] = useState(false);
  const [activePopUp, setActivePopUp] = useState({ id: null, fields: [] });
  const [input, setInput] = useState([]);

  const handleOpenPopUp = (button) => {
    if(button.type === 'button'){
      button.trigger();
      return;
    }

    setOpenPopUp(true);
    setActivePopUp({
      id: button.id,
      fields: button.fields
    });

    if (button.type === 'input') {
      setInput(button.fields.map((field) => {
        return { name: field, value: '' }
      }));
    }
  }

  const handleClosePopUp = () => {
    setOpenPopUp(false);
    setActivePopUp({ id: null, fields: [] });
  }

  const handlePopUpRadio = (field, trigger) => {
    trigger(field);
    handleClosePopUp();
  }

  const activeButton = buttons.find((item) => item.id === activePopUp.id);
  const handlePopUpInput = (name, e) => {
    const value = e.target.value;
    setInput((prev) =>
      prev.map((x) => (x.name === name ? { ...x, value } : x))
    );
  };
  const handlePopUpInputKeyDown = (e, trigger) => {
    if (e.key === "Enter") {
      e.preventDefault();
      console.log(input.map((inp) => `${inp.name}: ${inp.value}`).join(", "));
      const functionArgs = input.map((input) => input.value);
      trigger(...functionArgs);
      handleClosePopUp();
    }
  };

  const [isRotating, setIsRotating] = useState(false);

  return (
    <div id='container'>
      <div className='restoreIconContainer'>
        <TbReload
          size={70}
          className={`restoreIcon ${isRotating ? "isRotating" : ""}`}
          onClick={() => { setIsRotating(true); }}
          onAnimationEnd={() => { setIsRotating(false); clearTable(); }}
        />
      </div>

      <div id='containerDraw'>
      </div>

      <div className='menu'>
        {
          buttons.map((button) => {
            return <Button key={button.id} label={button.label} design={'ghost'} onClick={() => handleOpenPopUp(button)} />
          })
        }
      </div>

      {
        openPopUp && (
          <div className='popUp' onClick={() => { handleClosePopUp(); }}>
            <div className='message' onClick={(e) => e.stopPropagation()}>
              <div className='question text text--title text--titleTertiary'>
                {activeButton.label}
              </div>
              <div className="options">
                {activeButton?.type === "input"
                  ? input.map((inp) => (
                    <input
                      className='input'
                      placeholder={`Enter ${inp.name}`}
                      key={inp.name}
                      type="text"
                      value={inp.value}
                      onChange={(e) => handlePopUpInput(inp.name, e)}
                      onKeyDown={(e) => { handlePopUpInputKeyDown(e, activeButton.trigger) }}
                      style={{ "--width": `${30 / activeButton.fields.length}rem` }}
                    />
                  ))
                  : activePopUp.fields.map((field) => (
                    <Button
                      key={field}
                      onClick={() => handlePopUpRadio(field, activeButton.trigger)}
                      label={field}
                      design="ghost"
                    />
                  ))}
              </div>

            </div>
          </div>
        )
      }
    </div>
  );
}