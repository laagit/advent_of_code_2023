// This is my solution to part 1 of Advent of Code 2023 - Day 19: Aplenty.
// You can read the task description and get input data here https://adventofcode.com/2023/day/19

let read_input = `paste
multi
line
input
here`;

// read and transform 'parts' input 
let intermediary = read_input.split("\n\n");

let parts_list = intermediary[1].split("\n");
let parts_formatted = new Array();

for (i=0; i<parts_list.length; i++){
    let part_list = parts_list[i].slice(1, -1).split(",");
    let building_part = {};
    for (j=0; j<part_list.length;j++){
        building_part[part_list[j].split("=")[0]] = part_list[j].split("=")[1];
    }
    parts_formatted.push(building_part);
}

console.log("parts: ");
console.log(parts_formatted);

// read and transform 'workflows' input
let workflows_list = intermediary[0].split("\n");
let workflows_formatted = {};

for (i=0; i<workflows_list.length;i++){
    x = workflows_list[i].split("{");
    y = x[1].slice(-1) == "}" ? x[1].slice(0, -1) : x[1];
    workflows_formatted[x[0]] = new Array();
    y.split(",").forEach(elem=>elem.includes(":") ? workflows_formatted[x[0]].push(elem) : workflows_formatted[x[0]].push(("else:"+elem)));
}

console.log("workflows: ");
console.log(workflows_formatted);

accepted = new Array();
rejected = new Array();

function check_condition(part, category, operator, condition_number){
    if (operator == "less than"){
        if (Number(part[category]) < Number(condition_number)){
            console.log("less than was true");
            return true;
        }
    }
    else if (operator == "more than"){
        if (Number(part[category]) > Number(condition_number)){
            console.log("more than was true");
            return true;
        }
    }
}

function run_workflow(part, workflow){
    console.log("\n part is:")
    console.log(part)
    for (i=0;i<workflow.length;i++){
        let [key, value] = workflow[i].split(":");
        console.log("key is "+key+" and value is "+value + "\n");

        if (key == "else"){
            if (value == "A"){
                accepted.push(part);
                return "stop recursion";
            }
            else if (value == "R"){
                rejected.push(part);
                return "stop recursion";
            }
            else {
                if (run_workflow(part, workflows_formatted[value]) == "stop recursion"){
                    break;
                }
            } 
        }

        if (key.includes("<")){
            if (check_condition(part, key.split("<")[0], "less than", key.split("<")[1])){
                if (value == "A"){
                    accepted.push(part);
                    return "stop recursion";
                }
                if (value == "R"){
                    rejected.push(part);
                    return "stop recursion";
                }
                if (run_workflow(part, workflows_formatted[value]) == "stop recursion"){
                    break;
                }
            }
                
        }

        if (key.includes(">")){
            if (check_condition(part, key.split(">")[0], "more than", key.split(">")[1])){
                if (value == "A"){
                    accepted.push(part);
                    return "stop recursion";
                }
                if (value == "R"){
                    rejected.push(part);
                    return "stop recursion";
                }
                if (run_workflow(part, workflows_formatted[value]) == "stop recursion"){
                    break;
                }
            }
        }
    } 
    return "stop recursion";
}

// run the formatted parts through the formatted workflows and sort to 'accepted' or 'rejected'
parts_formatted.forEach(x=>run_workflow(x, workflows_formatted["in"]));

// sum the accepted parts to get the solution
all_parts_total = 0;
for (i=0; i<accepted.length; i++){
    part_total = 0;
    part_total += Number(accepted[i].x);
    part_total += Number(accepted[i].m);
    part_total += Number(accepted[i].a);
    part_total += Number(accepted[i].s);
    all_parts_total += part_total;
}

console.log("all accepted parts total: " + all_parts_total);
