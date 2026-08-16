import json
p = 'apps/web/tmp_names.json'
with open(p, 'r', encoding='utf-8') as f:
    data = json.load(f)
print(len(data))
print(data[:3])
