export type ClockLocation = {
  timezone: string
  label: string
}

export type Commodity = {
  name: string
  price: number
  change: number
}

export type Column = {
  type: "index" | "icon" | "text" | "linkList" | "link"
  label?: string
  key?: string
}

export type LinkListItem = {
  label: string
  url: string
}