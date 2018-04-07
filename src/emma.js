import { h, Component, Text } from 'ink'
import Spinner from 'ink-spinner'
import TextInput from 'ink-text-input'

import { search, getPackage, AlgoliaLogo } from './algolia'
import { install } from './install'

// Helpers -------------------------------------------------------------------

const notEmpty = x => x.length > 0
const isEmpty = x => x.length === 0

// Progress Constants

const PROGRESS_NOT_LOADED = 'not_loaded'
const PROGRESS_LOADING = 'loading'
const PROGRESS_LOADED = 'loaded'
const PROGRESS_ERROR = 'error'

// Stage Constants

const PHASE_SEARCH = 'search'
const PHASE_SUGGEST = 'suggest'
const PHASE_INSTALL = 'install'

// Emma ----------------------------------------------------------------------

// Search

const Search = ({ value, onChange }) => (
   <div>
      <Text bold white>
         {`Search packages 📦  : `}
      </Text>
      <TextInput
         value={value}
         onChange={onChange}
         placeholder="..."
      />
   </div>
)

// Overview

const SelectedPackage = ({ pkg }) => (
   <div>
      <Text magenta>
         {` ›`}
      </Text>
      <Text bold white>
         {` ${pkg.name} `}
      </Text>
      <Text grey>
         {` ${pkg.version} `}
      </Text>
   </div>
)

const SelectedPackages = ({ selectedPackages }) => (
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

// Restults

const SearchResults = ({ foundPackages, onToggle, loading }) => {
   return (
      <span>
         <SelectInput
            items={foundPackages}
            itemComponent={Package}
            onSelect={onToggle}
         />
         {isEmpty(foundPackages) && (
            <NotFoundInfo/>
         )}
         <AlgoliaLogo/>
         {loading === PROGRESS_LOADING && (
            <div>
               <Text bold>
                  <Spinner red/> Fetching
               </Text>
            </div>
         )}
      </span>
   )
}

// Info

const SearchInfo = () => (
   <div>
      <Text grey>Try typing in to search the database.</Text>
   </div>
)

const InstallInfo = () => (
   <div>
      <Text grey>Press enter to install all of your packages.</Text>
   </div>
)

const NotFoundInfo = () => (
   <div>
      <Text grey>
         {`We couldn't find any package that would match your input...`}
      </Text>
   </div>
)

const ErrorInfo = () => (
   <div>
      <Text red>Check your internet connection.</Text>
   </div>
)

// Emma ----------------------------------------------------------------------

class Emma extends Component {
   constructor(props) {
      super(props)

      this.state = {
         query: '',
         loading: PROGRESS_NOT_LOADED,
         foundPackages: [],
         selectedPackages: [],
         phase: PHASE_SEARCH
      }

      this.handleQueryChange = this.handleQueryChange.bind(this)
      this.handleInstall = this.handleInstall.bind(this)
      this.handleTogglePackage = this.handleTogglePackage.bind(this)
   }

   render() {
      const { query, foundPackages, selectedPackages, loading } = this.state

      return (
         <div>
            <Search
               value={query}
               onChange={this.handleQueryChange}
               onSubmit={this.handleInstall}
               loading={loading}
            />
            {loading === PROGRESS_NOT_LOADED && <SearchInfo/>}
            {isEmpty(query) && <InstallInfo/>}
            {loading === PROGRESS_ERROR && <ErrorInfo/>}
            {notEmpty(query) && (
               <SearchResults
                  foundPackages={foundPackages}
                  onToggle={this.handleTogglePackage}
                  loading={loading}
               />
            )}
            {notEmpty(selectedPackages) && (
               <SelectedPackages selectedPackages={selectedPackages}/>
            )}
         </div>
      )
   }

   async handleQueryChange(query) {
      this.setState({
         query,
         loading: PROGRESS_LOADING,
         phase: PHASE_SEARCH
      })

      try {
         const res = await this.fetchPackages(query)

         if (this.state.query === query) {
            this.setState({
               foundPackages: res,
               loading: PROGRESS_LOADED
            })
         }
      } catch (err) {
         this.setState({
            loading: PROGRESS_ERROR
         })
      }
   }

   handleTogglePackage(pkg) {
      const { selectedPackages, loading } = this.state

      if (loading !== PROGRESS_LOADED) {
         return
      }

      const exists = selectedPackages.some(
         ({ objectID }) => objectID === pkg.objectID
      )

      if (exists) {
         this.setState({
            query: '',
            selectedPackages: selectedPackages.filter(
               ({ objectID }) => objectID !== pkg.objectID
            )
         })
      } else {
         this.setState({
            query: '',
            selectedPackages: [...selectedPackages, pkg]
         })
      }
   }

   async handleInstall() {
      const { query, selectedPackages } = this.state

      if (notEmpty(query)) {
         return
      }

      if (isEmpty(selectedPackages)) {
         this.props.onExit()
      }

      await install(selectedPackages)

      this.props.onExit()
   }

   async fetchPackages(query) {
      const res = await search({
         query,
         attributesToRetrieve: [
            'name',
            'version',
            'description',
            'owner',
            'humanDownloadsLast30Days'
         ],
         offset: 0,
         length: 5
      })

      return res.hits
   }

   async fetchPackage(name) {
      const res = await getPackage({
         name,
         attributesToRetrieve: ['name', 'version', 'description']
      })

      return res
   }
}

export default Emma
