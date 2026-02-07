import os

# Define file paths
files_to_edit = [
    {'path': r'c:\\Users\\Xezal\\Downloads\\RoomXQR\\frontend\\src\\app\\tr\\page.tsx', 'start': 265, 'end': 369},
    {'path': r'c:\\Users\\Xezal\\Downloads\\RoomXQR\\frontend\\src\\app\\en\\page.tsx', 'start': 266, 'end': 369},
    {'path': r'c:\\Users\\Xezal\\Downloads\\RoomXQR\\frontend\\src\\app\\de\\page.tsx', 'start': 266, 'end': 369}
]

for item in files_to_edit:
    file_path = item['path']
    start_line = item['start'] # 1-based
    end_line = item['end']     # 1-based
    
    print(f"Processing {file_path}...")
    
    if not os.path.exists(file_path):
        print(f"File not found: {file_path}")
        continue

    with open(file_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()
    
    # Check bounds
    if start_line < 1 or end_line > len(lines):
        print(f"Invalid range {start_line}-{end_line} for file with {len(lines)} lines")
        continue

    # Verify content start (approximate check)
    start_content = lines[start_line-1].strip()
    # Simple check for AI comment
    if "{/* AI Image Enhancement Section */}" not in start_content:
        print(f"Warning: Line {start_line} does not look like start of AI section. Content: {start_content}")
        # Proceeding anyway as line numbers were verified recently, but strictly logging it.
    
    # Remove lines
    # Slice: keep 0 to start-2 (lines before start_line)
    # keep end_line to end (lines after end_line)
    new_lines = lines[:start_line-1] + lines[end_line:]
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.writelines(new_lines)
    
    print(f"Successfully removed lines {start_line}-{end_line} from {file_path}")
