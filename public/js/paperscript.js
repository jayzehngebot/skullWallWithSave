        var path;

        function onMouseDown(event) {
            // If we produced a path before, deselect it:
            if (path) {
                path.selected = false;
            }

            // Create a new path and set its stroke color to black:
            path = new Path();
            path.add(event.point);
            path.strokeColor = '#FFFFF0';
            path.strokeWidth = '7'

            // Select the path, so we can see its segment points:
            path.fullySelected = false;
        }

        // While the user drags the mouse, points are added to the path
        // at the position of the mouse:
        function onMouseDrag(event) {
            path.add(event.point);

        }

        // When the mouse is released, we simplify the path:
        function onMouseUp(event) {

            // When the mouse is released, simplify it:
            path.simplify(10);

            // Select the path, so we can see its segments:
            path.fullySelected = false;

        }
