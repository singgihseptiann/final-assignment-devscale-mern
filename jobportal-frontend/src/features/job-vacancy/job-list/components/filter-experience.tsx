import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function FilterExperience() {
  return (
    <div className="flex flex-col gap-2">
      <h2 className="py-2 font-bold">Experience Level</h2>
      <div className="flex items-center gap-2">
        <Input id="no-experience" type="checkbox" className="h-4 w-4" />
        <Label htmlFor="no-experience">No Experience</Label>
      </div>
      <div className="flex items-center gap-2">
        <Input id="fresher" type="checkbox" className="h-4 w-4" />
        <Label htmlFor="fresher">Fresher</Label>
      </div>
      <div className="flex items-center gap-2">
        <Input id="intermediate" type="checkbox" className="h-4 w-4" />
        <Label htmlFor="intermediate">Intermediate</Label>
      </div>
      <div className="flex items-center gap-2">
        <Input id="expert" type="checkbox" className="h-4 w-4" />
        <Label htmlFor="expert">expert</Label>
      </div>
    </div>
  );
}
