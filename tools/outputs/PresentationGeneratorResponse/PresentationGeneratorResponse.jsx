import React from 'react';
import { Fade, Grid, Typography, Button } from '@mui/material';
import { useSelector } from 'react-redux';
import pptxgen from "pptxgenjs";
import styles from './styles';

/**
 * PresentationGenerator component renders a list of slides generated from the response data.
 * It fetches the slide data from the Redux store (`tools` slice) and displays each slide
 * with its title, content, and suggestions in a styled grid layout.
 * 
 * The component provides an option to export the slides as a text file using the FileSaver library.
 * Material-UI's Grid, Typography, Fade, and Button components are utilized for styling, 
 * animations, and interactivity.
 */

const PresentationGeneratorResponse = () => {
    const { response } = useSelector((state) => state.tools);

    const handleExport = async () => {
        if (!response?.list_slides) return;

        const pres = new pptxgen();

        response.list_slides.forEach((slide) => {
            const pptSlide = pres.addSlide();

            // Add title
            pptSlide.addText(slide.title, {
                x: 0.5,
                y: 0.5,
                w: '90%',
                fontSize: 24,
                bold: true,
            });

            // Add content
            pptSlide.addText(slide.content, {
                x: 0.5,
                y: 1.5,
                w: '90%',
                fontSize: 14,
            });

            // Add suggestions if they exist
            if (slide.suggestions) {
                pptSlide.addText(`Suggestions: ${slide.suggestions}`, {
                    x: 0.5,
                    y: 4,
                    w: '90%',
                    fontSize: 12,
                    color: '666666',
                    italic: true,
                });
            }
        });

        // Save the presentation
        await pres.writeFile('presentation.pptx');
    };

    const renderSlides = () => (
        <Grid {...styles.slidesGridProps}>
            {response?.list_slides?.map((slide, index) => (
                <Grid key={`slide-${index}`} {...styles.slideGridProps}>
                    <Grid {...styles.slideHeaderProps}>
                        <Typography {...styles.slideLabelProps}>Slide {index + 1}</Typography>
                        <Typography {...styles.titleProps}>{slide.title}</Typography>
                    </Grid>
                    <Grid {...styles.slideContentWrapperProps}>
                        <Typography {...styles.contentProps}>{slide.content}</Typography>
                        {slide.suggestions && (
                            <Typography {...styles.suggestionsProps}>
                                <span style={styles.suggestionLabelStyle}>Suggestions:</span> {slide.suggestions}
                            </Typography>
                        )}
                    </Grid>
                </Grid>
            ))}
        </Grid>
    );

    return (
        <Fade in>
            <Grid {...styles.mainGridProps}>
                {response && renderSlides()}
                {response?.list_slides && (
                    <Grid {...styles.exportButtonGridProps}>
                        <Button
                            variant="contained"
                            onClick={handleExport}
                            {...styles.exportButtonProps}
                        >
                            Export as PowerPoint
                        </Button>
                    </Grid>
                )}
            </Grid>
        </Fade>
    );
};

export default PresentationGeneratorResponse;