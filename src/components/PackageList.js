import { h, Component, Text } from 'ink'
import dot from 'dot-prop'
import terminal from 'term-size'

// Terminal

const maxCellSize = () => terminal().columns / 4

// Additional

const notEmpty = x => x.length !== 0
const isEmpty = x => x.length === 0
const getCellPadding = (pkgs, pkg) => attr => {
   const cells = pkgs.map(_pkg => dot.get(_pkg, attr))

   const cellWidth = Math.max(...cells.map(cell => (cell ? cell.length : 0)))

   const cellValueWidth =
    dot.get(pkg, attr) === null ? 0 : dot.get(pkg, attr).length
   const width = cellWidth - cellValueWidth

   return ` `.repeat(width)
}

// Package

export const PackageAttribute = ({ pkg, attr, ...props }) => (
   <Text {...props}>
      {`${dot.get(pkg, attr)} ${pkg._cell(attr)}`.slice(0, maxCellSize())}
   </Text>
)

export const Package = pkg => (
   <Text>
      <PackageAttribute pkg={pkg} attr="humanDownloadsLast30Days"/>
      <PackageAttribute pkg={pkg} attr="name" blueBright bold/>
      <PackageAttribute pkg={pkg} attr="owner.name" cyan/>
      <PackageAttribute pkg={pkg} attr="description" bold/>
   </Text>
)
