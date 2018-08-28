echo "<html>"
echo "  <head>"
echo "    <title>Rockets!</title>"
echo "    <script src=\"/P5Playground/rockets/node_modules/p5/lib/p5.js\"></script>"

for file in $(find src ! -type d)
do echo "    <script src=\"/P5Playground/rockets/$file\"></script>"
done

echo "    <style>body { margin: 0; padding: 0; }</style>"
echo "  </head>"
echo "  <body></body>"
echo "</html>"
