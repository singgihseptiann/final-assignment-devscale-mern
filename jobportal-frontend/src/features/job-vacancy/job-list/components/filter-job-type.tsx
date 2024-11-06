import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function FilterJobType() {
  return (
    <div className="flex flex-col gap-2">
      <h2 className="py-2 font-bold">Filter by Job Type</h2>
      <div className="flex items-center gap-2">
        <Input id="full-time" type="checkbox" className="h-4 w-4" />
        <Label htmlFor="full-time">Full Time</Label>
      </div>
      <div className="flex items-center gap-2">
        <Input id="part-time" type="checkbox" className="h-4 w-4" />
        <Label htmlFor="part-time">Part Time</Label>
      </div>
      <div className="flex items-center gap-2">
        <Input id="freelance" type="checkbox" className="h-4 w-4" />
        <Label htmlFor="freelance">Freelance</Label>
      </div>
      <div className="flex items-center gap-2">
        <Input id="internship" type="checkbox" className="h-4 w-4" />
        <Label htmlFor="internship">Internship</Label>
      </div>
    </div>
  );
}
