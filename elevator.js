{
    init: function(elevators, floors) {

        var elevator = elevators[0];
        var topFloor = floors.length - 1;
        var lastFloor = -1;

        elevator.displayGoUp = function () {
            this.goingUpIndicator(true);
            this.goingDownIndicator(false);
        }

        elevator.displayGoDown = function () {
            this.goingUpIndicator(false);
            this.goingDownIndicator(true);
        }

        elevator.goAndUpdate = function (floorNum) {
            this.goToFloor(floorNum);
            if (this.currentFloor() <= floorNum && floorNum != lastFloor) {
                this.displayGoUp();
            } else {
                this.displayGoDown();
            }
        }

        // first
        elevator.displayGoUp();

        elevator.on("floor_button_pressed", function(floorNum) {
            elevator.goAndUpdate(floorNum);
        });

        elevator.on("idle", function() {
            this.goAndUpdate(0);
        });

        elevator.on("passing_floor", function(floorNum, direction) {
            if (direction == "up") {
                this.displayGoUp();
            } else {
                this.displayGoDown();
            }
        });

        elevator.on("stopped_at_floor", function(floorNum) {
            if (floorNum == topFloor) {
                this.displayGoDown();
            };
        });




    },
    update: function(dt, elevators, floors) {
    // We normally don't need to do anything here
    }
}