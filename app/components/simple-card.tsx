import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function SimpleCard() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Washify</CardTitle>
        <CardDescription>Make laundry easy and fast.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Schedule pickup, track progress, and get fresh clothes delivered to your home.
        </p>
      </CardContent>
      <CardFooter>
        <Button>Get Started</Button>
      </CardFooter>
    </Card>
  )
}
