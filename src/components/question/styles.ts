import styled from "styled-components";
import { colors } from "../../styles/colors";

export const Container = styled.div`
  margin-bottom: 1rem;

  button {
    margin: 0.5rem;
    margin-left: 0;
  }
  
  .item {
    margin: 1rem 0;
    p {
      cursor: pointer;
    }
  }
`

export const ItemContainer = styled.div`
    .question {
      display: flex;
      margin-bottom: 0.5rem;
      align-items: center;
      
      p, span {
        margin-right: 0.5rem
      }
      
      .edit, .delete {
        font-size: 12px;
        cursor: pointer;
      }

      .edit {
        color: ${colors.primary};
      }
      
      .delete {
        color: ${colors.warn};
      }
    }
    .answer {
      font-style: italic;
    }
`
