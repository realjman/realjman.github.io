let tab = 0

const TABS = {
  0: {
    id: `About Me`,
    content: `
      I am ${colored("realjman", "#51688f")}!<br> I go by many names but mostly "J man".<br>
      <div class='line'></div>
      I am 16 years old (I will turn 17 in ${calculateDaysTillBirthday()} day(s)).<br>
      <div class='line'></div>
      ${colored("Pronouns:", "#394b6e")} any<br>
      <div class='line'></div>
      ${colored("Languages I have learnt:", "#59518f")} js, css, py, lua<br>
      <div class='line'></div>
      ${colored("Games I play:", "#63518f")} Minecraft, Roblox, osu!, some incremental games<br>
    `,
  },
  1: {
    id: `Games`,
    content: `All my games:`,
  },
  2: {
    id: `Additional Information`,
    content: `
      I held positions in ${colored("Lethal Games", "#3062b3")} as an ${colored("Administrator", "#85518f")} and a ${colored("Game Tester", "#a1479e")}.
    `,
  },
  3: {
    id: `Extras`,
    content: `Extra stuff:`
  },
}

const LINKS = {
  "AddInfo": {
    "Lethal Games Discord Server": {
      linkURL: "https://discord.gg/lethalgames"
    },
    "Grass Cutting Incremental": {
      linkURL: "https://www.roblox.com/games/9292879820/"
    },
  },
  "Extras": {
    "YouTube Channel": {
      linkURL: "https://www.youtube.com/@realjman"
    },
    "Discord Server": {
      linkURL: "https://discord.gg/UUyR82mzMG"
    },
    "osu! Profile": {
      linkURL: "https://osu.ppy.sh/users/35496547"
    },
    "Roblox Profile": {
      linkURL: "https://www.roblox.com/users/195013063/profile"
    },
    "GitHub Profile": {
      linkURL: "https://github.com/realjman"
    }
  },
}

const GAMES = {
  "Modded": {
    color: "#75518f",
    games: {
        "Antimatter FASTER Dimensions / AD:Fasterer": {
        linkURL: "https://realjman.github.io/ADfasterer"
      },
        "The J Tree: Replanted": {
        linkURL: "https://realjman.github.io/The-J-Tree-Replanted"
      },
    }
  },
}

el.setup.tabs = () => {
  let h = ""

  for (let i in TABS) {
    h += `<button class='tabButton' id='tabbtn${i}' onclick='tab = ${i}'>${TABS[i].id}</button>`
  }

  new Element('tabs').setHTML(h)
}

el.update.tabs = () => {
  for (let i in TABS) {
    i = parseInt(i)

    let id = TABS[i].id, btn = tmp.el['tabbtn'+i]

    btn.setTxt(tab == i ? `> ${id} <` : id)
  }
}

el.setup.content = () => {
  let h = TABS[tab].content

  new Element('content').setHTML(h)
}

el.update.content = () => {
  let txt = TABS[tab].content, div = tmp.el['content']

  div.setHTML(txt)
}

function setupGamesHTML() {
  let h = ""

  for (let ctg in GAMES) {
    h += `${colored(ctg + " Games:", GAMES[ctg].color, "h4")}`
    for (let i in GAMES[ctg].games) {
      let url = GAMES[ctg].games[i].linkURL
      h += `<button class='linkButton' onclick="window.open('${url}')">${i}</button>`
    }
  }

  new Element('games').setHTML(h)
}

function updateGamesHTML() {
  let div = tmp.el['games']

  div.setDisplay(tab == 1)
}

el.setup.addInfo = () => {
  let h = ""

  h += colored("Links:", "#75518f", "h4")

  let addInfo = LINKS['AddInfo']

  for (let i in addInfo) {
    let url = addInfo[i].linkURL
    h += `<button class='linkButton' onclick="window.open('${url}')">${i}</button>`
  }

  new Element('addInfo').setHTML(h)
}

el.update.addInfo = () => {
  let div = tmp.el['addInfo']

  div.setDisplay(tab == 2)
}

el.setup.extras = () => {
  let h = ""
  let extras = LINKS['Extras']

  for (let i in extras) {
    let url = extras[i].linkURL
    h += `<button class='linkButton' onclick="window.open('${url}')">${i}</button>`
  }

  new Element('extras').setHTML(h)
}

el.update.extras = () => {
  let div = tmp.el['extras']

  div.setDisplay(tab == 3)
}

