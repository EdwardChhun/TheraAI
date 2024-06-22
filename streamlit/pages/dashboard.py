import pandas as pd
import json
import matplotlib.pyplot as plt
import numpy as np

plt.figure(figsize=(5,3),dpi=300)
plt.xlabel('Time (mins)')
plt.ylabel('Emotion intensity')
plt.show()

data = json.load(open('lang-reveal.json'))
scores = data['language']['predictions']
print(scores)

df = pd.DataFrame(columns=['Word', 'Score'])

joy_scores = []
sad_scores = []

print(scores[0]['emotions'][0]['name'])

for i in range(0, len(scores)):
    curr = scores[i]['emotions']
    for j in range(0, len(curr)):
        if curr[j]['name'] == 'Sadness':
            sad_scores.append(curr[j]['score'])
        elif curr[j]['name'] == 'Joy':
            joy_scores.append(curr[j]['score'])

x = np.arange(0, 60, 60/len(joy_scores))

plt.plot(x, joy_scores, marker='.', markersize=4)
plt.plot(x, sad_scores, marker='.', markersize=4)
plt.show()