import pathlib
import cv2

cascade_path = pathlib.Path(cv2.__file__).parent.absolute() / "data/haarcascade_frontalface_default.xml"

clf = cv2.CascadeClassifier(str(cascade_path))

camera = cv2.VideoCapture(0)

if not camera.isOpened():
    print("Error: Could not open camera.")
    exit()

while True:
    _, frame = camera.read()
    
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    
    faces = clf.detectMultiScale(
        gray,
        scaleFactor=1.1,
        minNeighbors=5,
        minSize=(30,30),
        flags=cv2.CASCADE_SCALE_IMAGE
    )

    if len(faces) > 0:
        largest_face = max(faces, key=lambda rect: rect[2] * rect[3])

        # Draw rectangle around the largest face
        (x, y, w, h) = largest_face
        cv2.rectangle(frame, (x, y), (x + w, y + h), (255, 0, 0), 2)
        cv2.putText(frame, 'Largest Face', (x, y - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.9, (255, 0, 0), 2)

    # This just flips the frame
    frame = cv2.flip(frame, 1)

    cv2.imshow("Faces", frame)
    if cv2.waitKey(1) == ord("q"):
        break
    
        
camera.release()
cv2.destroyAllWindows()


        