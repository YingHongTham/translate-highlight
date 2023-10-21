## convert verbs-conjugations.csv into a plain json dictionary
## (csv from https://github.com/viorelsfetea/german-verbs-database,
## as output/verbs.csv)
## columns of csv start with Infinitiv
## last column is some helper verb (haben or sein etc)
## outputs file with rows
##   'conjugate': 'infinitive'
## (8 rows for each infinitive)
##
## currently ignoring issues with empty entries
## (some empty entries are given by '—')

## Note: one should do some cleaning, currently doing it manually:
## -Benutzer:TaxonBot/lieben ---> lieben
## -Vorlage:Formatvorlage (Verb) --> spielen
## -removed line Benutzer:Yoursmile/FV/Verb,e,st,t,te,get,te,,t,haben
## -Benutzer:Thirunavukkarasye-Raveendran/abstoßen --> abstoßen
##     (also removed strange punctuations like '!')
## -Benutzer:Udo T./gehen --> gehen
## removed <!--Das in einigen Standardreferenzen angegebene Hilfsverb „sein“ gehört zu einer weiteren Bedeutung-->
## removed <!-- |Hilfsverb*=sein -->"


import csv
import json

conj_dict = {}

#with open("verbs-conjugations-test.csv", encoding="utf-8") as csv_file:
with open("verbs-conjugations.csv") as csv_file:
  csv_reader = csv.reader(csv_file, delimiter=',')
  line_num = 0
  for row in csv_reader:
    if line_num == 0:
      line_num = 1
      continue
    for j in range(1,9):
      conj_dict[row[j]] = row[0]

## writing to file
conj_dict_sorted = dict(sorted(conj_dict.items()))
out_str = "const verbsConjToInf = "
out_str += json.dumps(conj_dict_sorted, indent=2, ensure_ascii=False)
with open("verbs-conj-to-inf.js", "w", encoding="utf-8") as out_file:
  out_file.write(out_str)

# as pure JSON
#with open("verbs-conj-to-inf.json", "w", encoding="utf-8") as out_file:
#  out_file.write(json.dumps(conj_dict_sorted, indent=2, ensure_ascii=False))
