import { h, Text } from 'ink'

export const SelectedPackages = ({ selectedPackages }) => (
   <div>
      <div/>
      <div>
         <Text bold white>Picked: </Text>
      </div>
      {selectedPackages.map(pkg => (
         <SelectedPackage key={pkg.name} pkg={pkg}/>
      ))}
   </div>
)
