## dict-DE-EN form https://www1.dict.cc/translation_file_request.php
## basic cleaning: lines 572565, 485378 have unmatched brackets
##
## get rid of all the stuff in brackets (record the {m},{f},{n})
## e.g. (Bestimmung der) Erythrozytenzahl {f} <RBC>
##	    --> Erythrozytenzahl {f}
## (bis) zu diesem Zeitpunkt [zum Zeitpunkt dieses Schreibens]
##			--> zu diesem Zeitpunkt
##
## complications:
## -different spellings:
## e.g. (Blauer) Wasser-Ehrenpreis / Wasserehrenpreis {m}
##   split this into two lines:
##			--> Wasser-Ehrenpreis {m}
##      --> Wasserehrenpreis {m}
## -phrases, e.g. above "zu diesem Zeitpunkt"
##	 remove line completely
##
## output format: dictionary,
## keys is word
## value is (type, [meaning1, meaning2, ...])
## type = "noun(m)", "verb", etc.

import csv
import json

mydict = {}


# one must have s[i] == op
# assumes op != cl
def GetClosingBracketIndex(s,i,op,cl):
	if s[i] != op:
		print("expect s[i] == op")
		print("s: ", s, "i: ", i, "op: ", op)
		return -1
	depth = 1
	for j in range(i+1,len(s)):
		if s[j] == op:
			depth += 1
		elif s[j] == cl:
			depth -= 1
#
		if depth == 0:
			return j
#
	print("unable to find closing bracket")
	print("s: ", s, "i: ", i, "op: ", op)
	return -1

def RemoveBracketsGetGender(text):
	i = 0
	cleaned = ""
	gender = ""
	while i < len(text):
		# encounter open bracket, find closing and skip
		if text[i] == "(":
			j = GetClosingBracketIndex(text,i,"(",")")
			if j == -1:
				return (-1,"")
			i = j + 1
			continue
		if text[i] == "[":
			j = GetClosingBracketIndex(text,i,"[","]")
			if j == -1:
				return (-1,"")
			i = j + 1
			continue
		if text[i] == "<":
			j = GetClosingBracketIndex(text,i,"<",">")
			if j == -1:
				return (-1,"")
			i = j + 1
			continue
		if text[i] == "{":
			j = GetClosingBracketIndex(text,i,"{","}")
			if j == -1:
				return (-1,"")
			gender = text[i+1:j]
			i = j + 1
			continue
		# accept non bracket character
		cleaned += text[i]
		i += 1
	return (cleaned, gender)

def RemovePunc(word):
	word = word.replace("!", "")
	word = word.replace("?", "")
	word = word.replace(".", "")
	return word

def SepListBySlash(ls):
	res = [[]]
	for s in ls:
		if s == "/":
			res.append([])
			continue
		res[-1].append(s)
	return res

mydict = {}
with open("dicts/dict-DE-EN.txt", encoding="utf-8") as csv_file:
#with open("dict-DE-EN-test.txt", encoding="utf-8") as csv_file:
	csv_reader = csv.reader(csv_file, delimiter='\t')
	for row in csv_reader:
		## ignore empty lines
		if len(row) == 0:
			continue
		## ignore comment lines
		if row[0][0] == '#':
			continue
		text,gender = RemoveBracketsGetGender(row[0])
		if text == -1:
			continue
#
		wtype = row[2] # in {'', 'noun', 'verb', 'adv', 'adj'}
		wordtypeset.add(wtype)
		if gender != "":
			wtype += "(" + gender + ")"
		meaning = row[1]
#
		wordls = text.split(" ")
		wordls = list(filter(lambda s: len(s) > 0, wordls))
		wordlsls = SepListBySlash(wordls)
		for words in wordlsls:
			## ignore entries that are phrases
			if len(words) != 1:
				continue
			word = words[0]
			word = RemovePunc(word)
			## add entry to mydict if new word
			if word not in mydict:
				mydict[word] = []
			mydict[word].append((wtype, meaning))

#print(json.dumps(mydict, indent=2, ensure_ascii=False))

## writing to file
mydict_sorted = dict(sorted(mydict.items()))
out_str = "const mydict = "
out_str += json.dumps(mydict_sorted, indent=2, ensure_ascii=False)
with open("dicts/mydict-DE-EN.js", "w", encoding="utf-8") as out_file:
  out_file.write(out_str)

