"use client"

import { useState, useEffect, useRef } from "react"
import {
  Box,
  IconButton,
  InputBase,
  Paper,
  Tooltip,
  Backdrop,
  Typography,
  List,
  ListItem,
  ListItemText,
  Chip,
  useTheme,
  alpha,
} from "@mui/material"
import {
  Search as SearchIcon,
  Close as CloseIcon,
  TrendingUp as TrendingIcon,
  Home as HomeIcon,
  ShoppingCart as ProductIcon,
  MenuBook as ResourceIcon,
  Apps as BrowseIcon,
} from "@mui/icons-material"

const GlobalSearchBar = () => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isElevated, setIsElevated] = useState(false)
  const [searchValue, setSearchValue] = useState("")
  const [elevatedSearchValue, setElevatedSearchValue] = useState("")
  const [showBrowse, setShowBrowse] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)
  const searchInputRef = useRef(null)
  const searchContainerRef = useRef(null)
  const theme = useTheme()

  const pagesSections = [
    {
      title: "Main Pages",
      icon: HomeIcon,
      pages: ["Home", "About Us", "Services", "Contact"],
    },
    {
      title: "Products",
      icon: ProductIcon,
      pages: ["Web Development", "Mobile Apps", "UI/UX Design", "Consulting"],
    },
    {
      title: "Resources",
      icon: ResourceIcon,
      pages: ["Blog", "Documentation", "Tutorials", "FAQ"],
    },
    {
      title: "Support",
      icon: TrendingIcon,
      pages: ["Help Center", "Community", "Contact Support", "Live Chat"],
    },
  ]

  const popularSearches = [
    "React Components",
    "Material UI Tutorial",
    "Next.js Best Practices",
    "JavaScript Tips",
    "CSS Animations",
  ]

  useEffect(() => {
    const handleKeyDown = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key === "k") {
        event.preventDefault()
        setIsElevated(true)
        setIsExpanded(true)
      }
      if (event.key === "Escape" && isElevated) {
        handleClose()
      }
    }

    const handleClickOutside = (event) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target) &&
        isExpanded &&
        !isElevated
      ) {
        setIsExpanded(false)
        setSearchValue("")
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isElevated, isExpanded])

  const handleSearchClick = () => {
    if (!isExpanded) {
      setIsExpanded(true)
      setTimeout(() => {
        if (searchInputRef.current) {
          searchInputRef.current.focus()
        }
      }, 300)
    } else {
      setIsElevated(true)
    }
  }

  const handleExpandedClick = () => {
    setIsElevated(true)
  }

  const handleClose = () => {
    setIsElevated(false)
    setIsExpanded(false)
    setSearchValue("")
    setElevatedSearchValue("")
    setShowBrowse(false)
  }

  const handleInputChange = (event) => {
    setSearchValue(event.target.value)
    setShowBrowse(false)
    if (!isElevated) {
      setIsElevated(true)
    }
  }

  const handleElevatedInputChange = (event) => {
    setElevatedSearchValue(event.target.value)
  }

  const handleBrowseClick = () => {
    setShowBrowse(!showBrowse)
  }

  const handlePageClick = (page) => {
    console.log(`Navigate to: ${page}`)
    handleClose()
  }

  const handlePopularSearchClick = (search) => {
    setElevatedSearchValue(search)
    setShowBrowse(false)
  }

  const getFilteredSections = () => {
    if (!elevatedSearchValue.trim()) {
      return pagesSections
    }

    const searchTerm = elevatedSearchValue.toLowerCase()
    const filteredSections = []

    pagesSections.forEach((section) => {
      // Check if section title matches
      if (section.title.toLowerCase().includes(searchTerm)) {
        filteredSections.push(section)
      } else {
        // Check if any page in the section matches
        const matchingPages = section.pages.filter((page) => page.toLowerCase().includes(searchTerm))
        if (matchingPages.length > 0) {
          filteredSections.push({
            ...section,
            pages: matchingPages,
          })
        }
      }
    })

    return filteredSections
  }

  const CompactSearch = () => (
    <Box ref={searchContainerRef} sx={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
      {!isExpanded || isElevated ? (
        <Tooltip title="Search (Ctrl + K)" open={showTooltip} placement="bottom">
          <IconButton
            onClick={handleSearchClick}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            sx={{
              color: theme.palette.text.primary,
              backgroundColor: alpha(theme.palette.primary.main, 0.1),
              "&:hover": {
                backgroundColor: alpha(theme.palette.primary.main, 0.2),
                transform: "scale(1.1)",
              },
              transition: "all 0.3s ease",
              width: "40px",
              height: "40px",
            }}
          >
            <SearchIcon sx={{ fontSize: "1.2rem" }} />
          </IconButton>
        </Tooltip>
      ) : (
        <Paper
          elevation={2}
          sx={{
            display: "flex",
            alignItems: "center",
            width: { xs: "200px", sm: "280px" },
            height: "40px",
            borderRadius: "20px",
            px: 2,
            backgroundColor: theme.palette.background.paper,
            border: `1px solid ${theme.palette.divider}`,
            animation: "expandFromRight 0.3s ease-out",
            "@keyframes expandFromRight": {
              "0%": {
                width: "40px",
                opacity: 0.8,
              },
              "100%": {
                width: { xs: "200px", sm: "280px" },
                opacity: 1,
              },
            },
            "&:hover": {
              boxShadow: theme.shadows[4],
            },
          }}
        >
          <SearchIcon sx={{ color: theme.palette.text.secondary, mr: 1, fontSize: "1.1rem" }} />
          <InputBase
            ref={searchInputRef}
            placeholder="What are you looking for?"
            value={searchValue}
            onChange={handleInputChange}
            onClick={handleExpandedClick}
            sx={{
              flex: 1,
              fontSize: "0.9rem",
              "& input": {
                padding: 0,
              },
            }}
          />
          <Chip
            label="Ctrl+K"
            size="small"
            variant="outlined"
            sx={{
              ml: 1,
              height: "20px",
              fontSize: "0.65rem",
              color: theme.palette.text.secondary,
              borderColor: theme.palette.divider,
              cursor: "pointer",
            }}
            onClick={handleExpandedClick}
          />
          {searchValue && (
            <IconButton
              onClick={() => setSearchValue("")}
              size="small"
              sx={{
                ml: 0.5,
                color: theme.palette.text.secondary,
                width: "24px",
                height: "24px",
              }}
            >
              <CloseIcon sx={{ fontSize: "1rem" }} />
            </IconButton>
          )}
        </Paper>
      )}
    </Box>
  )

  const ElevatedSearch = () => (
    <Backdrop
      open={isElevated}
      onClick={handleClose}
      sx={{
        zIndex: theme.zIndex.modal,
        backgroundColor: alpha(theme.palette.common.black, 0.5),
      }}
    >
      <Paper
        onClick={(e) => e.stopPropagation()}
        elevation={24}
        sx={{
          width: { xs: "90%", sm: "600px" },
          maxHeight: "80vh",
          borderRadius: 3,
          overflow: "hidden",
          backgroundColor: theme.palette.background.paper,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            p: 2,
            borderBottom: `1px solid ${theme.palette.divider}`,
          }}
        >
          <SearchIcon sx={{ color: theme.palette.text.secondary, mr: 1 }} />
          <InputBase
            ref={searchInputRef}
            placeholder="What are you looking for?"
            value={elevatedSearchValue}
            onChange={handleElevatedInputChange}
            sx={{
              flex: 1,
              fontSize: "1.1rem",
              "& input": {
                padding: 0,
              },
            }}
          />
          <IconButton
            onClick={handleBrowseClick}
            sx={{
              ml: 1,
              color: showBrowse ? theme.palette.primary.main : theme.palette.text.secondary,
              backgroundColor: showBrowse ? alpha(theme.palette.primary.main, 0.1) : "transparent",
              "&:hover": {
                backgroundColor: alpha(theme.palette.primary.main, 0.1),
              },
              transition: "all 0.2s ease",
            }}
          >
            <BrowseIcon />
          </IconButton>
          <IconButton
            onClick={elevatedSearchValue ? () => setElevatedSearchValue("") : handleClose}
            sx={{ ml: 1, color: theme.palette.text.secondary }}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        <Box sx={{ maxHeight: "60vh", overflow: "auto" }}>
          {showBrowse ? (
            <Box sx={{ p: 2 }}>
              {(() => {
                const filteredSections = getFilteredSections()

                if (filteredSections.length === 0 && elevatedSearchValue.trim()) {
                  return (
                    <>
                      <Box sx={{ textAlign: "center", py: 3 }}>
                        <Typography
                          variant="body2"
                          sx={{
                            color: theme.palette.text.secondary,
                            mb: 2,
                          }}
                        >
                          No results found for "{elevatedSearchValue}"
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: "grid",
                          gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                          gap: 3,
                          alignItems: "start",
                        }}
                      >
                        {pagesSections.map((section, index) => {
                          const IconComponent = section.icon
                          return (
                            <Box key={section.title} sx={{ minHeight: "200px" }}>
                              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                                <IconComponent
                                  sx={{
                                    color: theme.palette.primary.main,
                                    mr: 2,
                                    fontSize: "2.5rem",
                                  }}
                                />
                                <Typography
                                  variant="h6"
                                  sx={{
                                    color: theme.palette.text.primary,
                                    fontWeight: 600,
                                  }}
                                >
                                  {section.title}
                                </Typography>
                              </Box>
                              <Box sx={{ ml: 5 }}>
                                <List dense>
                                  {section.pages.map((page) => (
                                    <ListItem
                                      key={page}
                                      component="button"
                                      onClick={() => handlePageClick(page)}
                                      sx={{
                                        borderRadius: 1,
                                        mb: 0.5,
                                        "&:hover": {
                                          backgroundColor: alpha(theme.palette.primary.main, 0.1),
                                        },
                                      }}
                                    >
                                      <ListItemText primary={page} />
                                    </ListItem>
                                  ))}
                                </List>
                              </Box>
                            </Box>
                          )
                        })}
                      </Box>
                    </>
                  )
                }

                return (
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                      gap: 3,
                      alignItems: "start",
                    }}
                  >
                    {filteredSections.map((section, index) => {
                      const IconComponent = section.icon
                      return (
                        <Box key={section.title} sx={{ minHeight: "200px" }}>
                          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                            <IconComponent
                              sx={{
                                color: theme.palette.primary.main,
                                mr: 2,
                                fontSize: "2.5rem",
                              }}
                            />
                            <Typography
                              variant="h6"
                              sx={{
                                color: theme.palette.text.primary,
                                fontWeight: 600,
                              }}
                            >
                              {section.title}
                            </Typography>
                          </Box>
                          <Box sx={{ ml: 5 }}>
                            <List dense>
                              {section.pages.map((page) => (
                                <ListItem
                                  key={page}
                                  component="button"
                                  onClick={() => handlePageClick(page)}
                                  sx={{
                                    borderRadius: 1,
                                    mb: 0.5,
                                    "&:hover": {
                                      backgroundColor: alpha(theme.palette.primary.main, 0.1),
                                    },
                                  }}
                                >
                                  <ListItemText primary={page} />
                                </ListItem>
                              ))}
                            </List>
                          </Box>
                        </Box>
                      )
                    })}
                  </Box>
                )
              })()}
            </Box>
          ) : (
            <Box sx={{ p: 2 }}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <TrendingIcon sx={{ color: theme.palette.text.secondary, mr: 1 }} />
                <Typography
                  variant="subtitle2"
                  sx={{
                    color: theme.palette.text.secondary,
                    fontWeight: 600,
                    textTransform: "uppercase",
                    fontSize: "0.75rem",
                  }}
                >
                  Popular Searches
                </Typography>
              </Box>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                {popularSearches.map((search) => (
                  <Chip
                    key={search}
                    label={search}
                    onClick={() => handlePopularSearchClick(search)}
                    variant="outlined"
                    sx={{
                      "&:hover": {
                        backgroundColor: alpha(theme.palette.primary.main, 0.1),
                        borderColor: theme.palette.primary.main,
                      },
                      cursor: "pointer",
                    }}
                  />
                ))}
              </Box>
            </Box>
          )}
        </Box>
      </Paper>
    </Backdrop>
  )

  return (
    <>
      <CompactSearch />
      <ElevatedSearch />
    </>
  )
}

export default GlobalSearchBar
