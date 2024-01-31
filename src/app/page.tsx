import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

export default function Home() {
  return (
    <main className="">
      <h1>hello world</h1>
      <Button>
        button test <Loader2 className="animate-spin" />
      </Button>
    </main>
  );
}
