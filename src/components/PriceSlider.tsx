"use client";

import * as Slider from '@radix-ui/react-slider';

type PriceRangeSliderProps = {
  values: [number, number];
  onValueChange: (values: [number, number]) => void;
};

export const PriceRangeSlider = ({ values, onValueChange }: PriceRangeSliderProps) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <span className="text-gray-700">Ranger:</span>
        <span className="font-semibold text-gray-900">
          Rs{values[0]} - Rs{values[1]}
        </span>
      </div>
      <Slider.Root
        className="relative flex items-center select-none touch-none w-full h-5"
        defaultValue={[0, 50000]}
        value={values}
        onValueChange={onValueChange}
        max={50000}
        step={100}
        minStepsBetweenThumbs={1}
      >
        <Slider.Track className="bg-gray-200 relative grow rounded-full h-1">
          <Slider.Range className="absolute bg-blue-600 rounded-full h-full" />
        </Slider.Track>
        <Slider.Thumb className="block w-5 h-5 bg-blue-600 shadow-md rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" />
        <Slider.Thumb className="block w-5 h-5 bg-blue-600 shadow-md rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" />
      </Slider.Root>
    </div>
  );
};