const textElement = document.getElementById("text")
const optionButtonsElement = document.getElementById("option-buttons")

let state = {}

function startGame() {
  state = {}
  showTextNode(1)
}

function showTextNode(textNodeIndex) {
  const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
  textElement.innerText = textNode.text
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild)
  }

  textNode.options.forEach(option => {
    if (showOption(option)) {
      const button = document.createElement("button")
      button.innerText = option.text
      button.classList.add("btn")
      button.addEventListener("click", () => selectOption(option))
      optionButtonsElement.appendChild(button)
    }
  })
}

function showOption(option) {
  return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
  const nextTextNodeId = option.nextText
  if (nextTextNodeId <= 0) {
    return startGame()
  }
  state = Object.assign(state, option.setState)
  showTextNode(nextTextNodeId)
}

const textNodes = [
  {
    id: 1,
    text: "You wake up and find yourself in a field. Next to you there is a briefcase.",
    options: [
      {
        text: "Pick up the briefcase",
        setState: { briefcase: true },
        nextText: 2
      },
      {
        text: "Leave the briefcase",
        setState: { briefcase: false, briefcaseless: true },
        nextText: 2
      }
    ]
  },
  {
    id: 2,
    text: "You see a city in the distance and begin walking towards it. On the way you come across an old man who warns you of bandits lurking in the woods.",
    options: [
      {
        text: "Thank him and proceed",
        nextText: 3
      },
      {
        text: "Spit in his face and proceed",
        setState: { badKarma: true },
        nextText: 3
      }
    ]
  },
  {
    id: 3,
    text: "You reach the woods. You are immidiately jumped by 2 bandits, who appear to just be poor. They demand you give them whatever possesions you own, despite being unarmed.",
    options: [
      {
        text: "Explain you are on important business and continue walking",
        nextText: 4
      },
      {
        text: "Quickly bludgeon both bandits to death with the briefcase and continue walking",
        requiredState: (currentState) => currentState.badKarma,
        setState: { bloodyBriefcase: true },
        nextText: 4
      },
      {
        text: "Quickly beat the bandits to death and run",
        requiredState: (currentState) => currentState.briefcaseless,
        setState: { bloodyHands: true, briefcase: false },
        nextText: 4
      },
      {
        text: "Run",
        nextText: 4
      }
    ]

  },
  {
    id: 4,
    text: "You finally make it to the city gates. The guards ask for your reason for being there",
    options: [
      {
        text: "Tell them you are a courier delivering the briefcase and won't cause any trouble",
        requiredState: (currentState) => currentState.briefcase,
        nextText: 6
      },
      {
        text: "Tell them you are a courier delivering the briefcase and you won't cause any trouble",
        requiredState: (currentState) => currentState.bloodyBriefcase,
        nextText: 7
      },
      {
        text: "Quickly bludgeon the guards to death",
        requiredState: (currentState) => currentState.briefcase,
        nextText: 8
      },
      {
        text: "Claim to just be passing through",
        requiredState: (currentState) => currentState.briefcaseless,
        nextText: 6
      },
      {
        text: "Claim to just be passing through",
        requiredState: (currentState) => currentState.bloodyHands,
        nextText: 50
      }
    ]
  },
  {
    id: 8,
    text: "You manage to hit the nearest guard upside the head, but as you turn to swing at the other he parries the suitcase and swiftly kills you. The other guard gets up, re-adjusts his helmet and kicks your body into the moat",
    options: [
      {
        text: "Maybe not fight armed guards clad in iron with a briefcase?",
        nextText: -1
      }
    ]
  },
  {
    id: 6,
    text: "The guards look you up and down, shrug and step aside. You advance into the city. You see a pub, a locksmith and the road leading to the rest of the city",
    options: [
      {
        text: "Go into the pub",
        nextText: 15
      },
      {
        text: "Go to the locksmith",
        nextText: 16
      },
      {
        text: "Go deeper into the city",
        nextText: 17
      }
    ]
  },
  {
    id: 7,
    text: "The guards look you up and down. They notice the briefcase is dripping in blood. The apprehend you and lock you in a cell. They leave the breifcase with the prison warden who is sleeping opposite your cell.",
    options: [
      {
        text: "Whistle",
        nextText: 9
      },
      {
        text: "Cry",
        nextText: 9
      },
      {
        text: "Quietly try to push the cell door open",
        nextText: 10
      }
    ]
  },
  {
    id: 50,
    text: "The guards look you up and down. They notice your hands are covered in blood. The apprehend you and lock you in a cell. They leave the breifcase with the prison warden who is sleeping opposite your cell.",
    options: [
      {
        text: "Whistle",
        nextText: 51
      },
      {
        text: "Cry",
        nextText: 51
      },
      {
        text: "Quietly try to push the cell door open",
        nextText: 52
      }
    ]
  },
  {
    id: 9,
    text: "A brick to your right falls out the wall. A small pale face appears on the other side. The stranger gives you a key claiming it wont work on his door and to try it on yours",
    options: [
      {
        text: "Take the key and try it on your cell door",
        nextText: 11
      },
      {
        text: "Swallow the key for no reason",
        nextText: 12
      }
    ]
  },
  {
    id: 12,
    text: "You choke and die",
    options: [
      {
        text: "Just... Why?",
        nextText: 9
      }
    ]
  },
  {
    id: 10,
    text: "The door just opens. Looks like the guards didn't even lock it. The small pale man in the cell next to yours quietly asks you to free him",
    options: [
      {
        text: "Grab your briefcase then the key from the sleeping warden and free him",
        nextText: 13
      },
      {
        text: "Grab the briefcase from next to the sleeping warden and enter the city",
        nextText: 14
      }
    ]
  },
  {
    id: 13,
    text: "The pale man licks all the blood from your briefcase, thanks you then scurries away like an animal",
    options: [
      {
        text: "Try to ignore what just happened and head back into the city",
        nextText: 14
      }
    ]
  },
  {
    id: 14,
    text: "You see a pub, a locksmith and a road leading to the rest of the city",
    options: [
      {
        text: "Head into the pub",
        nextText: 15
      },
      {
        text: "Go into the locksmith's",
        nextText: 16
      },
      {
        text: "Go deeper into the city",
        nextText: 17
      }
    ]
  },
  {
    id: 15,
    text: "You enter the pub. The place is littered with drunkards, some sleeping, some fighting, most of them dancing. The bartender ushers you over and offers you a free drink as you seem like you've had a terrible day",
    options: [
      {
        text: "Thank him and accept the drink",
        nextText: 18
      },
      {
        text: "Decline and soak in the atmosphere",
        nextText: 18
      },
      {
        text: "Join the jubilant dancing drunkards",
        nextText: 19
      }
    ]
  },
  {
    id: 18,
    text: "The man next to you drunkenly fiddles with your briefcase. He can't get it open. You snatch it back from him and he asks what is inside",
    options: [
      {
        text: "You tell him you don't know and that you can't open it",
        nextText: 20
      },
      {
        text: "Fearing that he will steal it, you turn and run out the pub",
        nextText: 21
      }
    ]
  },
  {
    id: 20,
    text: "The man tells you to try the locksmith next door before falling off his stool and wetting himself",
    options: [
      {
        text: "Leave",
        nextText: 21
      }
    ]
  },
  {
    id: 21,
    text: "You see the locksmith's and the road leading into town",
    options: [
      {
        text: "Walk into the locksmith's",
        nextText: 22
      },
      {
        text: "Walk deeper into town",
        nextText: 23
      }
    ]
  },
  {
    id:22,
    text: "The locksmith offers his assistance. He claims business has been slow ever since his creepy assistant ate half the children in the city before they managed to finally lock him up, so he will help for free in order to improve his stores reputation",
    options: [
      {
        text: "Ask him to open the briefcase",
        nextText: 24
      },
      {
        text: "Stroke his beard",
        nextText: 25
      }
    ]
  },
  {
    id: 25,
    text:"...",
    options: [
      {
        text: "Come to your senses and ask him to open the briefcase",
        nextText: 24
      }
    ]
  },
  {
    id: 24,
    text: "The locksmith looks at you suspiciously before deciding you seem innocent enough. He looks at the briefcase then claims he needs a special tool that he is yet to pick up from the blacksmith deeper in the city",
    options: [
      {
        text: "Offer to go into town for him and collect the tool",
        nextText: 26
      }
    ]
  },
  {
    id: 26,
    text: "You leave the shop and follow the road deeper into the city. You come across a distressed man and a gang of men who look like mercenaries. They ask you if you have seen a briefcase that matches the description of the one you just left with the locksmith",
    options: [
      {
        text: "Tell them you had it and you left it with the locksmith",
        nextText: 27
      },
      {
        text: "Claim you have not seen it",
        nextText: 28
      },
      {
        text: "Tell them you passed a pair of bandits in the forest outside the city and that you recall they had a similar one in their possesion",
        requiredState: (currentState) => currentState.badKarma,
        nextText: 28
      }
    ]
  },
  {
    id: 27,
    text: "One of the mercenaries grabs you and drags you to a near by alley. The others run off before returning with the briefcase. The odd man nods at the man restraining you as he pulls a key from his pocket. Before he can open it the mercenary kills you",
    nextText: 30
  },
  {
    id: 30,
    text: "What is in that briefcase?",
    options: [
      {
        text: "Try again?",
        nextText: 26
      },
      {
        text: "Screw it who cares?",
        nextText: 101
      }
    ]
  },
  {
    id: 28,
    text: "The men rush past you. You turn to watch them interrogate everyone they see until the enter the locksmith's shop. They then emerge and rush out of the city gates",
    options: [
      {
        text: "Follow them",
        nextText: 31
      }
    ]
  },
  {
    id: 31,
    text: "You follow them to the edge of the woods. The strange man grabs a key from his pocket and unlocks the briefcase. Golden light spews out of it. The men then one by one jump into the briefcase; disappearing as though it was a portal. After the last man jumps inside, the briefase slowly begins to close",
    options: [
      {
        text: "Quickly jump inside",
        nextText: 32
      },
      {
        text: "Quickly jump inside",
        requiredState: (currentState) => currentState.badKarma,
        nextText: 34
      },
      {
        text: "Watch it close",
        nextText: 33
      }
    ]
  },
  {
    id: 32,
    text: "You shoot through a prism of endless colours. You feel your physical body being torn apart but it is not painful. A bright light begins to encompas your vision and you feel yourself slowly tipping backwards...",
    options: [
      {
        text: "...",
        nextText: 35
      }
    ]
  },
  {
    id: 35,
    text: "You wake up. You catch yourself from falling out of your chair. You look around you and see the hub of a powerplant. You are at work. Your boss and his assitant berate you for falling asleep on the job again. You stare at them blankly as all you can focus on is your sudden craving for donuts",
    options: [
      {
        text: "Donuts?",
        nextText: 101
      },
      {
        text: "Donuts!",
        nextText: 101
      }
    ]
  },
  {
    id: 34,
    text: "You go to jump inside but right as you do, the old man you spat on earlier smashes you on the head with a rock",
    options: [
      {
        text: "Damn, maybe I shouldn't spit on old people",
        nextText: 101
      }
    ]
  },
  {
    id: 33,
    text: "The briefcase closes. You stare at it blankly. Before deciding you need a strong drink",
    options: [
      {
        text: "Head back to the pub",
        nextText: 36
      }
    ]
  },
  {
    id: 36,
    text: "The dancing strangers all rejoice at your arrival for some reason. They buy you drinks and make you dance with them",
    options: [
      {
        text: "Dance",
        nextText: 19
      },
      {
        text: "Dance vigorously",
        nextText: 19
      }
    ]
  },
  {
    id: 19,
    text: "You find that the strange events of today slip away as you look into the puffy red faces of the happy, intoxicated strangers. Their joy soon becomes your joy - You have found your people. You offer the bartender the briefcase as collateral for opening a tab you have no intention of paying back and drink with your new comrades. You are home.",
    nextText: 100
  },
  {
    id: 100,
    text: "After a long night of drinking and dancing you pass out",
    options: [
      {
        text: "Why do I feel like I'm outside?",
        nextText: 1
      },
      {
        text: "Decide you're too tired to get up right now",
        nextText: 101
      }
    ]
  },
  {
    id: 101,
    text: "End of your story. Play again?",
    options: [
      {
        text: "No I'm a drunk now leave me alone",
      },
      {
        text: "Yes I must know what's in the briefcase",
        nextText: 1
      }
    ]
  }
]

startGame()