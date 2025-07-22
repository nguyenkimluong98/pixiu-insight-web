import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { useDebouncedCallback } from '@/hooks/use-debounced-callback';
import { useState, useEffect, useRef } from 'react';
import { toast } from 'sonner';
import _ from 'lodash';

type Props = {
  range: number[];
  value: number[];
  onValueChange: (value: number[]) => void;
  disabled?: boolean;
  debounceMs?: number;
};

export default function SliderInputRange({
  range,
  value,
  onValueChange,
  disabled,
  debounceMs
}: Props) {
  const [localValue, setLocalValue] = useState<number[]>(value);
  const hasUserInteracted = useRef(false);

  // Debounced effect to notify parent
  const debouncedOnChange = useDebouncedCallback((val: number[]) => {
    if (!hasUserInteracted.current) return; // don't execute if user hasn't interacted yet

    const [from, to] = val;

    if (from > to) {
      toast.error('Invalid range: "From" must be less than "To"');
      setLocalValue(value);
      return;
    }

    if (from < range[0]) {
      toast.error('Invalid range: "From" must be greater than "Min"');
      setLocalValue(value);
      return;
    }

    if (to > range[1]) {
      toast.error('Invalid range: "To" must be less than "Max"');
      setLocalValue(value);
      return;
    }

    if (_.isEqual(value, val)) {
      return;
    }

    onValueChange(val);
  }, debounceMs ?? 300);

  // Watch localValue changes
  useEffect(() => {
    debouncedOnChange(localValue);
  }, [localValue]);

  // Keep in sync with props
  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  return (
    <div className='flex items-center gap-4'>
      <div className='flex items-center gap-2'>
        <label>From:</label>
        <Input
          disabled={disabled}
          className='inline-block w-24 text-center'
          type='number'
          value={localValue[0]}
          onChange={(e) => {
            hasUserInteracted.current = true;
            setLocalValue([parseInt(e.target.value || '0', 10), localValue[1]]);
          }}
        />
      </div>
      <Slider
        disabled={disabled}
        value={localValue}
        onValueChange={(value) => {
          hasUserInteracted.current = true;
          setLocalValue(value);
        }} // ← debounce ở đây
        min={range[0]}
        max={range[1]}
      />
      <div className='flex items-center gap-2'>
        <label>To:</label>
        <Input
          disabled={disabled}
          className='inline-block w-24 text-center'
          type='number'
          value={localValue[1]}
          onChange={(e) => {
            hasUserInteracted.current = true;
            setLocalValue([localValue[0], parseInt(e.target.value || '0', 10)]);
          }}
        />
      </div>
    </div>
  );
}
