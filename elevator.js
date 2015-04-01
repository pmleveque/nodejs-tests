// play it on http://play.elevatorsaga.com
{
    init: function(elevators, floors) {

        var topFloor = floors.length - 1;

        var floorsUpState = [];
        var floorsDownState = [];
        // fix it:
        var elevatorsState = [];

        elevators.forEach(function (elevator) {
            elevator.callsUp = [];
            elevator.callsDown = [];
            elevator.direction = "";

            elevator.displayGoAll = function () {
                this.goingUpIndicator(true);
                this.goingDownIndicator(true);
            }

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
                if (this.currentFloor() <= floorNum) {
                    this.displayGoUp();
                } else {
                    this.displayGoDown();
                }
            }


            // first
            elevator.displayGoUp();

            elevator.on("floor_button_pressed", function(floorNum) {
                elevator.goToFloor(floorNum);
                //affiner: up or down
                this.callsUp[floorNum] = 0;
                this.callsDown[floorNum] = 0;
            });

            elevator.on("idle", function() {
                this.goAndUpdate(0);
            });

            elevator.on("stopped_at_floor", function(floorNum) {
                // affiner: go up or down?
                floorsUpState[floorNum] = 0;
                this.callsUp[floorNum] = 0;
                this.callsDown[floorNum] = 0;

                if (floorNum == topFloor) {
                    this.displayGoDown();
                };
            });

            elevator.on("passing_floor", function(floorNum, direction) {
                this.direction = direction;
            });
        });



        floors.forEach(function (floor) {
            floor.on("up_button_pressed", function() {
                floorsUpState[this.floorNum()] += 1;
                elevators[1].goToFloor(this.floorNum());
            });

            floor.on("down_button_pressed", function() {
                floorsDownState[this.floorNum()] += 1;
                elevators[2].goToFloor(this.floorNum());
            });
        });


    },
    update: function(dt, elevators, floors) {
        console.log
    }
}