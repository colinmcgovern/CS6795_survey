import json
import copy
import pandas as pd

testFile = [
    'asdf - {"name":"Colin_1743343255","key":"nickname","value":"Colin_1743343255","password":"password1111"}',
    'qwr adf    - {"name":"Colin_1743343255","key":"pair of cards","value":"00car 00car_duplicate","password":"password1111"}',
    'qwr adf    - {"name":"Colin_1743343255","key":"pair of cards","value":"00car 10car_duplicate","password":"password1111"}',
    'qwr adf    - {"name":"Colin_1743343255","key":"pair of cards","value":"00donkey_duplicate 00donkey","password":"password1111"}',
    '1234 - {"name":"Colin_1743343255","key":"flash_memory","value":{"image":"/cards/90_computer.png","shown":false,"answer":false,"correct":true},"password":"password1111"}',
    '1234 - {"name":"Colin_1743343255","key":"flash_memory","value":{"image":"/cards/90_computer222.png","shown":false,"answer":false,"correct":false},"password":"password1111"}',
    '1234 - {"name":"Colin_1743343255","key":"flash_memory","value":{"image":"/cards/90_computer.png","shown":false,"answer":true,"correct":true},"password":"password1111"}',
    '2025-04-07 22:18:18 - {"name": "Colin_1743343255", "key": "formData", "value": {"age": "26", "gender": "male", "ethnicity": "asian", "politicalParty": "other", "educationLevel": "advanced-degree", "maritalStatus": "no", "children": "0", "country": "USA", "state": "Utah", "gamingFrequency": "every-week", "futureOutlook": "neutral"}, "password": "password1111"}',
    '2025-04-07 22:18:43 - {"name": "Colin_1743343255", "key": "formData", "value": {"item-0": "6", "item-1": "5", "item-2": "5", "item-4": "5", "item-3": "6"}, "password": "password1111"}',

    'asdf - {"name":"bingo","key":"nickname","value":"bingo","password":"password1111"}',
    'qwr adf    - {"name":"bingo","key":"pair of cards","value":"00poop 00car_duplicate","password":"password1111"}',
    'qwr adf    - {"name":"bingo","key":"pair of cards","value":"00poop 00poop","password":"password1111"}',
    '1234 - {"name":"bingo","key":"flash_memory","value":{"image":"/cards/90_hello222.png","shown":false,"answer":false,"correct":false},"password":"password1111"}',
    '1234 - {"name":"bingo","key":"flash_memory","value":{"image":"/cards/90_computer.png","shown":false,"answer":true,"correct":true},"password":"password1111"}',
    '1234 - {"name":"bingo","key":"flash_memory","value":{"image":"/cards/90_hello222.png","shown":false,"answer":false,"correct":true},"password":"password1111"}',
    '2025-04-07 22:18:18 - {"name": "bingo", "key": "formData", "value": {"age": "1", "gender": "2", "ethnicity": "3", "politicalParty": "4", "educationLevel": "5", "maritalStatus": "6", "children": "7", "country": "8", "state": "9", "gamingFrequency": "10", "futureOutlook": "11"}, "password": "password1111"}',
    '2025-04-07 22:18:43 - {"name": "bingo", "key": "formData", "value": {"item-0": "0", "item-1": "0", "item-0": "0", "item-4": "0", "item-3": "1"}, "password": "password1111"}'
]

users = {}

userDefaultData = {
    "numCardsCorrect": 0,
    "numCardsIncorrect": 0,
    "firstCardsFlipped": [],
    "firstPairsCorrect": "",
    "isFirstStreak": True,
    "firstStreak": [],
    "pairsSolvedByEnd": [],
    "cardsSeenButNeverSolved": [],
    
    "numImagesCorrect": 0,
    "numImagesIncorrect": 0,
    "imagesSeen": [],
    "correctImagesFirstSeen": [],
    "incorrectImagesFirstSeen": [],
    "correctImagesByEnd": [],

    "n-points": 0
}

def parse_line(line, users):
    print("")

    if "password1111" not in line:
        return users

    parts = line.split(" - ")
    if len(parts) < 2:
        return users

    try:
        print(parts[1])
        action_data = json.loads(parts[1])

    except json.JSONDecodeError:
        print("JSON convert error")
        return users

    key = action_data.get("key")
    value = action_data.get("value")
    name = action_data.get("name")

    if(key == "nickname"):
        users[name] = copy.deepcopy(userDefaultData)
        print("added user: " + action_data.get("name"))
        print(userDefaultData)
        print(users[name])
    
    elif(key == "pair of cards"):
        cards = value.split(" ")
        if len(cards) == 2:
            card1, card2 = cards
            card1 = card1.replace("_duplicate", "")
            card2 = card2.replace("_duplicate", "")

            if len(users[name]["firstCardsFlipped"]) < 2:
                users[name]["firstCardsFlipped"].append(card1)
                users[name]["firstCardsFlipped"].append(card2)

            if card1 == card2:
                users[name]["numCardsCorrect"] += 1
                users[name]["pairsSolvedByEnd"].append(card1)
                if users[name]["firstPairsCorrect"] == "":
                    users[name]["firstPairsCorrect"] = card1
                if users[name]["isFirstStreak"]:
                    users[name]["firstStreak"].append(card1)
                users[name]["cardsSeenButNeverSolved"] = [card for card in users[name]["cardsSeenButNeverSolved"] if card != card1]

            else:
                users[name]["numCardsIncorrect"] += 1
                users[name]["isFirstStreak"] = False
                if card1 not in users[name]["pairsSolvedByEnd"]:
                    users[name]["cardsSeenButNeverSolved"].append(card1)
                if card2 not in users[name]["pairsSolvedByEnd"]:
                    users[name]["cardsSeenButNeverSolved"].append(card2)
        
    elif(key == "flash_memory"):
        print("flash memory")
        image = value["image"].replace("/cards/", "").replace(".png", "")
        isCorrect = value["correct"]

        if isCorrect:
            users[name]["numImagesCorrect"] += 1
            if image not in users[name]["correctImagesFirstSeen"] and image not in users[name]["imagesSeen"]:
                users[name]["correctImagesFirstSeen"].append(image)
            if image not in users[name]["correctImagesByEnd"]:
                users[name]["correctImagesByEnd"].append(image)
        else:
            users[name]["numImagesIncorrect"] += 1
            if image not in users[name]["incorrectImagesFirstSeen"] and image not in users[name]["imagesSeen"]:
                users[name]["incorrectImagesFirstSeen"].append(image)
        
        users[name]["imagesSeen"].append(image)
        
    elif(key == "formData"):
        print("formData")
        value
        for key, val in value.items():
            if key.startswith("item-"):
                users[name]["n-points"] += int(val)
            else:
                users[name][key] = val
    
    return users

def print_file_lines(filepath, users):
    try:
        with open(filepath, 'r') as file:
            for line in file:
                print(line.strip())
                users = parse_line(line.strip(), users)
    except FileNotFoundError:
        print(f"Error: The file at {filepath} was not found.")
    except Exception as e:
        print(f"An error occurred: {e}")

if __name__ == "__main__":
    log_file_path = "./log.txt"
    f = open(log_file_path, "r")
    for line in f:
        print(line)
        users = parse_line(line, users)
    # for line in testFile:
    #     users = parse_line(line, users)

print("")
for user, data in users.items():
    print(f"User: {user}")
    for key, value in data.items():
        print(f"  {key}: {value}")

        # Convert the users dictionary into a pandas DataFrame
        users_df = pd.DataFrame.from_dict(users, orient='index')

        # Reset the index to make the user names a column, if needed
        users_df.reset_index(inplace=True)
        users_df.rename(columns={'index': 'user'}, inplace=True)

        # Print the resulting DataFrame

# Adjusting data to be more easily plotted 
decadeToYear = {
    "70": 1970,
    "80": 1980,
    "90": 1990,
    "00": 2000,
    "10": 2010,
    "20": 2020
}

# Adding year columns to the DataFrame

first_pairs_correct_list = users_df["firstPairsCorrect"].tolist()
first_pairs_years = []
for pair in first_pairs_correct_list: 
    if isinstance(pair, str) and len(pair) > 0:
        first_pairs_years.append(decadeToYear[pair[:2]])
    else:
        first_pairs_years.append(None)

users_df["firstPairsCorrect_year"] = first_pairs_years

avg_year_columns = ["firstCardsFlipped", "firstStreak", "pairsSolvedByEnd", "correctImagesFirstSeen", "correctImagesByEnd"]
for column in avg_year_columns:
    newColumnValues = []
    for each_user_cards in users_df[column]:
        # each_user_cards = each_user_cards.replace("[", "").replace("]", "").replace("'", "").split(", ")
        if(len(each_user_cards) == 0):
            newColumnValues.append(None)
            continue
        avg = 0
        for card in each_user_cards:
            if isinstance(card, str) and len(card) > 0:
                print(card)
                avg += decadeToYear[card[:2]]
        avg = avg / len(each_user_cards)
        newColumnValues.append(avg)
    users_df[column + "_year"] = newColumnValues

# age adjusted year columns
rel_year_columns = ["firstPairsCorrect_year", "firstCardsFlipped_year", "firstStreak_year", "pairsSolvedByEnd_year", "correctImagesFirstSeen_year", "correctImagesByEnd_year"]

for column in rel_year_columns:
    new_col = []
    nos_year = users_df[column].to_list()
    ages = users_df["age"].to_list()
    for i in range(len(nos_year)):
        if nos_year[i] != None and nos_year[i] != 0 and nos_year[i] == nos_year[i] and ages[i] != None and ages[i] != 0 and ages[i] == ages[i]:
            year = (2025 - int(ages[i])) - int(nos_year[i]) 
            new_col.append(year)
        else: 
            new_col.append(None)
    users_df[column + "_rel"] = new_col


# eduction level to number

# gaming frequency to number

# future outlook to number


# Finally saving the data to a CSV file

users_df.to_csv("out.csv", index=False)