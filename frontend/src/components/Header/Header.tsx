import { ShieldCheck, Plus } from 'lucide-react';
import { useContext } from 'react';
import { TaskDataContext } from '@/context/task-data.context';
import { Button } from '@/components/ui/button';

function Header() {
  const { addTaskBlock } = useContext(TaskDataContext);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 w-full items-center justify-between px-6 text-foreground">
        <div className="flex items-center gap-3 active:scale-95 transition-transform cursor-pointer select-none">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary shadow-sm hover:shadow-md transition-shadow">
            <ShieldCheck className="h-5 w-5 text-primary-foreground" strokeWidth={2.5} />
          </div>
          <h1 className="text-xl font-black tracking-tighter">
            TASK<span className="text-primary tracking-normal ml-0.5">tamer</span>
          </h1>
        </div>

        <div className="flex items-center gap-4">
          <Button
            onClick={addTaskBlock}
            variant="default"
            size="sm"
            className="h-9 px-4 rounded-xl font-bold shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all gap-2"
          >
            <Plus className="h-4 w-4" strokeWidth={3} />
            <span className="hidden sm:inline">Add Block</span>
          </Button>

          <div className="h-8 w-[1px] bg-border mx-1" />

          <div className="flex items-center gap-2 px-3 py-1 bg-secondary/50 rounded-full border border-border">
            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Connected</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
