Component Implementation Pattern

1. Import Dependencies

   ```tsx
   import React, { useState, useEffect } from 'react';
   import Typography from '@/sharedComponents/typography/typography';
   import Button from '@/shared/components/button/button';
   import { IComponentProps } from './component.interface';
   import { helperFunction } from '@/shared/utilities/common';
   import IconImage from '@/publicImages/icon.svg';
   ```

2. Define Interfaces and Types

   ```tsx
   interface IProps {
     title: string;
     description?: string;
     onClick?: (id: string) => void;
     className?: string;
     testId?: string;
   }
   ```

3. Initialize Component

   ```tsx
   const ComponentName = (props: IProps) => {
     const { title, description, onClick, className = '', testId } = props;

     // Component implementation
   ```

4. Manage State

   ```tsx
   const [isActive, setIsActive] = useState<boolean>(false);

   useEffect(() => {
     // Initialize or update state based on props
   }, [dependencyProp]);
   ```

5. Create Helper Functions

   ```tsx
   const formatData = (data: string): string => {
     // Logic to format data
     return formattedData;
   };
   ```

6. Create Render Methods

   ```tsx
   const renderSectionName = () => {
     return (
       <div className="flex items-center">
         <Typography variant="base" component="p">
           {title}
         </Typography>
       </div>
     );
   };
   ```

7. Implement Event Handlers

   ```tsx
   const handleClick = (event: React.MouseEvent<HTMLElement>) => {
     event.stopPropagation();
     onClick && onClick(id);
   };
   ```

8. Return JSX Structure

   ```tsx
   return (
     <div
       className={`flex flex-col bg-at-white rounded-xl ${className}`}
       data-testid={testId || 'component-name'}
       onClick={handleClick}
     >
       {renderSectionName()}
       {condition && renderConditionalSection()}
     </div>
   );
   ```

9. Export Component
   ```tsx
   export default ComponentName;
   ```

## Best Practices

### Styling

- Use Tailwind CSS for styling
- Group related classes together

### Component Design

- Keep components focused on single responsibilities
- Use conditional rendering for variants
- Create reusable, configurable components
- Pass className prop to allow customization

### Props and State

- Use TypeScript interfaces for type safety
- Provide default values for optional props
- Keep state minimal and focused

### Rendering Optimization

- Break complex components into smaller render methods
- Use conditional rendering effectively

### Event Handling

- Use proper event typing
- Implement stopPropagation when needed
- Create specific handler functions for different actions

### Accessibility

- Use semantic HTML elements
- Add ARIA attributes when necessary
- Support keyboard navigation

### Testing

- Add data-testid attributes to elements
- Create testable component logic
