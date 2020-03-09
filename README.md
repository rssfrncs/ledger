# Ledger app

Lot's to discuss!

## Todo (a fair amount!)

- Add e2e tests for critical flows
  - Use testcafe
- Test reducer logic with Jest
  - Reducer is small so this will be cheap to get good coverage.
- Extract all styles into styled-components for runtime performance and cross browser compatibility.
  - Plus for consistency sake
- Better UX for transaction rejection
  - It would be ideal to block any further transactions until the user has dismissed some kind of rejection UI.
- Replace input datetime-local with anything else (such a bad ux on desktop)
- Move static theme object to styled-components theme provider
- Fix initial buggy animation for chart
