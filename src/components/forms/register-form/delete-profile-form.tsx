import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export function DeleteProfileForm() {
  return (
    <Card>
      <form>
        <CardContent className="pt-6">
          <Button type="submit" variant="destructive" className="w-full">
            Deletar conta
          </Button>
        </CardContent>
      </form>
    </Card>
  );
}
