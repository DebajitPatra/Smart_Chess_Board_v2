# This script demonstrates how to generate G-code for the first part of a chess move:
# moving the gantry to a piece's location and activating the electromagnet.

import chess

# --- Configuration ---
# You will need to calibrate these values for your specific physical board.
# Assume a simple coordinate system where the board is a grid from (0, 0) to (280, 280) mm.
# Each square is 35x35 mm.
BOARD_ORIGIN_X = 0
BOARD_ORIGIN_Y = 0
SQUARE_SIZE = 35 # mm

# A dictionary to map file (a-h) to X-axis index (0-7) and rank (1-8) to Y-axis index (0-7).
# This is crucial for translating chess notation to physical coordinates.
SQUARE_TO_INDEX = {
    'a': 0, 'b': 1, 'c': 2, 'd': 3, 'e': 4, 'f': 5, 'g': 6, 'h': 7,
    '1': 0, '2': 1, '3': 2, '4': 3, '5': 4, '6': 5, '7': 6, '8': 7
}

# --- G-Code Generation Function ---

def chess_square_to_coordinates(square):
    """
    Converts a chess square string (e.g., "e2") to a physical (x, y) coordinate.
    
    Args:
        square (str): The chess square, like "e2".
        
    Returns:
        tuple: A tuple (x, y) representing the physical coordinates.
    """
    file = square[0]
    rank = square[1]
    
    # Get the index for the file and rank.
    file_index = SQUARE_TO_INDEX.get(file.lower())
    rank_index = SQUARE_TO_INDEX.get(rank)
    
    if file_index is None or rank_index is None:
        raise ValueError(f"Invalid chess square: {square}")

    # Calculate the center of the square. We add half a square size
    # to center the electromagnet over the piece.
    x_coord = BOARD_ORIGIN_X + file_index * SQUARE_SIZE + (SQUARE_SIZE / 2)
    y_coord = BOARD_ORIGIN_Y + rank_index * SQUARE_SIZE + (SQUARE_SIZE / 2)
    
    return x_coord, y_coord


def generate_gcode_for_pickup(square):
    """
    Generates G-code commands to move the gantry to a square and activate the electromagnet.
    
    This is the first step of a chess move.
    
    Args:
        square (str): The chess square where the piece is to be picked up (e.g., "e2").
    
    Returns:
        str: A multi-line string containing the generated G-code.
    """
    x, y = chess_square_to_coordinates(square)
    
    gcode = []
    
    # G90: Set to Absolute Positioning mode. All coordinates are from the board origin.
    gcode.append("G90")
    
    # G28: Home all axes. This is a critical safety step to ensure the gantry's starting position is known.
    gcode.append("G28")
    
    # G0: Rapid move to the pickup location (X and Y coordinates).
    # We use G0 for speed as we are not cutting or extruding anything.
    gcode.append(f"G0 X{x:.2f} Y{y:.2f}")
    
    # G4 P100: Dwell for 100 milliseconds. This is good practice to ensure the
    # motors have settled before the next command.
    gcode.append("G4 P100")
    
    # M106 P0 S255: Turn on the electromagnet.
    # M106 is a common G-code command for turning on a fan or spindle. We are
    # repurposing it here. P0 is the index of the "spindle," and S255 is the
    # maximum power (0-255). This would need to be configured on your
    # microcontroller's firmware.
    gcode.append("M106 P0 S255")
    
    # G4 P500: Dwell for 500 milliseconds to give the electromagnet time to engage.
    gcode.append("G4 P500")
    
    return "\n".join(gcode)


# --- Example Usage ---
# We will use a chess move from the previous example: "e2e4"
def main():
    """
    Main function to simulate a move and generate G-code.
    """
    print("--- G-Code Generation for First Move Step ---")
    
    move = "e2e4"
    move_from_square = move[:2] # "e2"
    
    # Generate the G-code for picking up the piece at the starting square.
    pickup_gcode = generate_gcode_for_pickup(move_from_square)
    
    print(f"Generating G-code to pick up piece at square: {move_from_square}")
    print("------------------------------------------")
    print(pickup_gcode)
    print("------------------------------------------")
    print("\nThis G-code would be sent to your microcontroller (e.g., Arduino with GRBL).")


if __name__ == "__main__":
    main()
