// This is my solution to part 1 of Advent of Code 2023 - Day 7: Camel Cards.
// You can read the task description and get input data here https://adventofcode.com/2023/day/7

// test case from reddit thread. Output for part 2 should be 6592 ( https://www.reddit.com/r/adventofcode/comments/18cr4xr/2023_day_7_better_example_input_not_a_spoiler/ )
let read_input = `2345A 1
Q2KJJ 13
Q2Q2Q 19
T3T3J 17
T3Q33 11
2345J 3
J345A 2
32T3K 5
T55J5 29
KK677 7
KTJJT 34
QQQJA 31
JJJJJ 37
JAAAA 43
AAAAJ 59
AAAAA 61
2AAAA 23
2JJJJ 53
JJJJ2 41`

let card_strength_dict = {2:2, 3:3, 4:4, 5:5, 6:6, 7:7, 8:8, 9:9, T:10, J:11, Q:12, K:13, A:14}
let hand_strength_dict = {"high_card": 0, "one_pair": 1, "two_pair": 2, "three_kind": 3, "full_house": 4, "four_kind": 5, "five_kind": 6}

let example_input = {
    "0":{"32T3K": 765},
    "1":{"T55J5": 684},
    "2":{"KK677": 28},
    "3":{"KTJJT": 220},
    "4":{"QQQJA": 483}
}

let intermediary = read_input.split("\n")

let input = {}

for (i=0; i< intermediary.length; i++){
    let x = intermediary[i].split(" ")
    input[i] = {[x[0]]: x[1]}
}

//input = example_input

let hand_strength = {}

for (let i=0; i < Object.keys(input).length; i++){
    handvalues = Object.keys(input[i])[0].split("");
    occurrences = {};

    // count occurrences of each card in hand
    handvalues.forEach(x=>{ 
        if (occurrences[x]){
            occurrences[x]+=1;
        } else {
            occurrences[x] = 1;
        };
    })

    // sort occurrences to easily find hand strength
    sorted = Object.values(occurrences).sort(function(a, b){return b-a})

    if (sorted[0] == 5){
        hand_strength[i] = "five_kind";
        continue;
    }

    if (sorted[0] == 4){
        hand_strength[i] = "four_kind";
        continue;
    }

    if (sorted[0] == 3 && sorted[1] == 2){
        hand_strength[i] = "full_house";
        continue;
    }

    if (sorted[0] == 3){
        hand_strength[i] = "three_kind";
        continue;
    }

    if (sorted[0] == 2 && sorted[1] == 2){
        hand_strength[i] = "two_pair";
        continue;
    }

    if (sorted[0] == 2){
        hand_strength[i] = "one_pair";
        continue;
    }

    hand_strength[i] = "high_card";
}

function sort_hands(a, b){
    // if equal hand strength, sort by individual card strength
    if (hand_strength_dict[hand_strength[a]] == hand_strength_dict[hand_strength[b]]){
        for (i = 0; i < Object.keys(input[a])[0].split("").length; i++){
            // if individual cards are same strength, try the next card in hand
            if (Object.keys(input[a])[0].split("")[i] == Object.keys(input[b])[0].split("")[i]){
                if (i < 4){
                    continue
                } else return 0
            // compare individual card strength
            } else return card_strength_dict[Object.keys(input[b])[0].split("")[i]] - card_strength_dict[Object.keys(input[a])[0].split("")[i]]
        }
    // if hand strengths are different, simply sort by hand strength
    } else {
        return hand_strength_dict[hand_strength[b]] - hand_strength_dict[hand_strength[a]]
    }
}

sorted_hands = Object.keys(hand_strength).sort(sort_hands).reverse()

console.log("hands in ascending order: ")
console.log(sorted_hands)

hand_scores = new Array()

for (i = 0; i < sorted_hands.length; i++){
    hand_scores.push((i+1) * Object.values(input[sorted_hands[i]]))
}
console.log("hand scores (rank * bid) in same order :")
console.log(hand_scores)
console.log("end result:")
console.log(hand_scores.reduce((a, b)=>a+b))






